import { createHmac } from 'crypto'
import { NEST_SECRET } from 'src/config'

export function cryptoPassword (password: string): string {
  const hmac = createHmac('sha256', NEST_SECRET)
  return hmac.update(password).digest('hex')
}
