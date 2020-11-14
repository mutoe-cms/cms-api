import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger'

export const UseJwtGuards = (): MethodDecorator => {
  const jwtGuards = UseGuards(AuthGuard('jwt'))
  const apiBearerAuth = ApiBearerAuth()
  const apiUnauthorizedResponse = ApiUnauthorizedResponse()

  const decorator : MethodDecorator = (...args) => {
    jwtGuards(...args)
    apiBearerAuth(...args)
    apiUnauthorizedResponse(...args)
  }
  return decorator
}
