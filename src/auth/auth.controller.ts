import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger'
import { LoginDto } from 'src/auth/dto/login.dto'
import { RegisterDto } from 'src/auth/dto/register.dto'
import { AuthRo } from 'src/auth/ro/auth.ro'
import { ApiInvalidFormResponse } from 'src/exception'
import { UserService } from 'src/user/user.service'
import { AuthService } from './auth.service'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor (
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'register', operationId: 'register' })
  @ApiCreatedResponse({ type: AuthRo })
  @ApiInvalidFormResponse()
  async register (@Body() registerDto: RegisterDto): Promise<AuthRo> {
    const userProfile = await this.authService.register(registerDto)
    return userProfile
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'login', operationId: 'login' })
  @ApiOkResponse({ type: AuthRo })
  @ApiUnprocessableEntityResponse({ schema: { example: { a: 1 } } })
  async login (@Body() loginDto: LoginDto): Promise<AuthRo> {
    const userProfile = await this.authService.login(loginDto)
    return userProfile
  }
}
