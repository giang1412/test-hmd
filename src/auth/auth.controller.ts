import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ZodSerializerDto } from 'nestjs-zod'
import {
  LoginBodyDTO,
  LoginResDTO,
  LogoutBodyDTO,
  ProfileResDTO,
  RefreshTokenBodyDTO,
  RefreshTokenResDTO,
  RegisterBodyDTO,
  RegisterResDTO,
} from 'src/auth/auth.dto'
import { AuthService } from 'src/auth/auth.service'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ZodSerializerDto(RegisterResDTO)
  async register(@Body() body: RegisterBodyDTO) {
    return await this.authService.register(body)
  }

  @Post('login')
  @ZodSerializerDto(LoginResDTO)
  async login(@Body() body: LoginBodyDTO) {
    return this.authService.login({
      ...body,
    })
  }

  @Post('refresh-token')
  @ZodSerializerDto(RefreshTokenResDTO)
  @HttpCode(HttpStatus.OK)
  refreshToken(@Body() body: RefreshTokenBodyDTO) {
    return this.authService.refreshToken({
      refreshToken: body.refreshToken,
    })
  }

  @Post('logout')
  logout(@Body() body: LogoutBodyDTO) {
    return this.authService.logout(body.refreshToken)
  }

  @Get('profile')
  @ZodSerializerDto(ProfileResDTO)
  me(@ActiveUser('userId') userId: string) {
    return this.authService.me(userId)
  }
}
