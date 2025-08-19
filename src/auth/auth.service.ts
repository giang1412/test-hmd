import { ConflictException, Injectable } from '@nestjs/common'
import { RegisterBodyDTO } from 'src/auth/auth.dto'
import { LoginBodyType, LogoutBodyType, RefreshTokenBodyType, RegisterBodyType } from 'src/auth/auth.model'
import { AuthRepository } from 'src/auth/auth.repo'
import { RoleType } from 'src/shared/constants/auth.constant'
import { isUniqueConstraintPrismaError } from 'src/shared/helpers'
import { HashingService } from 'src/shared/services/hashing.service'
import { TokenService } from 'src/shared/services/token.service'
import { AccessTokenPayloadCreate } from 'src/shared/types/jwt.type'

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly authRepository: AuthRepository,
    // private readonly sharedUserRepository: SharedUserRepository,
    private readonly tokenService: TokenService,
  ) {}

  async generateTokens({ userId, role }: { userId: string; role: RoleType }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.signAccessToken({
        userId,
        role,
      }),
      this.tokenService.signRefreshToken({
        userId,
        role,
      }),
    ])
    const decodedRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken)
    await this.authRepository.createRefreshToken({
      token: refreshToken,
      userId,
      expiresAt: new Date(decodedRefreshToken.exp * 1000),
      role,
    })
    return { accessToken, refreshToken }
  }
  async register(body: RegisterBodyType) {
    try {
      const hashedPassword = await this.hashingService.hash(body.password)

      const user = await this.authRepository.createUser({
        email: body.email,
        name: body.name,
        phone: body.phone,
        password: hashedPassword,
        role: body.role,
      })
      return user
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new ConflictException('Email or phone already exists')
      }
      throw error
    }
  }

  async login(body: LoginBodyType) {
    const user = await this.authRepository.findUniqueUserIncludeRole({
      email: body.email,
    })

    if (!user) {
      throw new ConflictException('Email  already exists')
    }

    const isPasswordMatch = await this.hashingService.compare(body.password, user.password)
    if (!isPasswordMatch) {
      throw new ConflictException('Invalid password')
    }

    const tokens = await this.generateTokens({
      userId: user.id,
      role: user.role,
    })
    return tokens
  }
}
