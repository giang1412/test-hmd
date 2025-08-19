import { Injectable } from '@nestjs/common'
import { RegisterBodyType } from 'src/auth/auth.model'
import { RoleType } from 'src/shared/constants/auth.constant'
import { UserType } from 'src/shared/model/shared-user.model'

import { PrismaService } from 'src/shared/services/prisma.service'

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createUser(user: Omit<RegisterBodyType, 'confirmPassword'>): Promise<Omit<UserType, 'password'>> {
    return this.prismaService.user.create({
      data: user,
      omit: {
        password: true,
      },
    })
  }
  createRefreshToken(data: { token: string; userId: string; expiresAt: Date; role?: RoleType }) {
    return this.prismaService.refreshToken.create({
      data,
    })
  }

  findUniqueUserIncludeRole(
    uniqueObject: { email: string } | { id: string },
  ): Promise<(UserType & { role: RoleType }) | null> {
    return this.prismaService.user.findUnique({
      where: uniqueObject,
    })
  }
}
