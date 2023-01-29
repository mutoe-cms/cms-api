import { ApiProperty } from '@nestjs/swagger'
import { ProfileRo } from 'src/user/ro/profile.ro'

export class AuthRo extends ProfileRo {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiZm9vQGV4YW1wbGUuY29tIiwiaWF0IjoxNTk3NTY1MDk5fQ.qRFuw88Zw7l5KY3TSuyr8hpan0fzH9HcDtkKYrLvQRQ' })
    token: string
}
