import { Body, Controller, Post } from '@nestjs/common'
import { ZodSerializerDto } from 'nestjs-zod'
import { LoginBodyDTO, LoginResDTO, RegisterBodyDTO, RegisterResDTO } from 'src/auth/auth.dto'
import { AuthService } from 'src/auth/auth.service'

@Controller('auth')
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

  // @Post('refresh-token')
  // @ZodSerializerDto(RefreshTokenResDTO)
  // @HttpCode(HttpStatus.OK)
  // refreshToken(@Body() body: RefreshTokenBodyDTO, @UserAgent() userAgent: string, @Ip() ip: string) {
  //   return this.authService.refreshToken({
  //     refreshToken: body.refreshToken,
  //     userAgent,
  //     ip,
  //   })
  // }

  // @Post('logout')
  // logout(@Body() body: LogoutBodyDTO) {
  //   return this.authService.logout(body.refreshToken)
  // }

  // @Post('forgot-password')
  // @IsPublic()
  // @ZodSerializerDto(MessageResDTO)
  // forgotPassword(@Body() body: ForgotPasswordBodyDTO) {
  //   return this.authService.forgotPassword(body)
  // }
}
