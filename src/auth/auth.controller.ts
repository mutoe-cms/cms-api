import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { AuthRo } from 'src/auth/dto/auth.ro'
import { LoginDto } from 'src/auth/dto/login.dto'
import { RegisterDto } from 'src/auth/dto/register.dto'
import { ApiInvalidFormResponse } from 'src/decorators'
import { AuthService } from './auth.service'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor (
    private readonly service: AuthService,
  ) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'register', operationId: 'register' })
  @ApiCreatedResponse({ type: AuthRo })
  @ApiInvalidFormResponse()
  async register (@Body() registerDto: RegisterDto): Promise<AuthRo> {
    const userProfile = await this.service.register(registerDto)
    return userProfile
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'login', operationId: 'login' })
  @ApiOkResponse({ type: AuthRo })
  @ApiInvalidFormResponse()
  async login (@Body() loginDto: LoginDto): Promise<AuthRo> {
    const userProfile = await this.service.login(loginDto)
    return userProfile
  }
}
