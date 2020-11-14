import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { NEST_SECRET } from 'src/config'

export interface AuthPayload { userId: number; email: string }
export interface AuthRequest { user: AuthPayload }

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor () {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: NEST_SECRET,
    })
  }

  validate (payload: AuthPayload): AuthPayload {
    const { userId, email } = payload
    return { userId, email }
  }
}
