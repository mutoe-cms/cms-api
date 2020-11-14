import { Controller, Get, Request } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UseJwtGuards } from 'src/guards'
import { AuthRequest } from 'src/auth/jwt.strategy'
import { ProfileRo } from 'src/user/ro/profile.ro'
import { UserService } from 'src/user/user.service'

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor (private readonly userService: UserService) {}

  @UseJwtGuards()
  @Get('/')
  @ApiOperation({ operationId: 'profile' })
  @ApiOkResponse({ type: ProfileRo })
  async profile (@Request() { user }: AuthRequest): Promise<ProfileRo> {
    return await this.userService.findUser({ id: user.userId })
  }
}
