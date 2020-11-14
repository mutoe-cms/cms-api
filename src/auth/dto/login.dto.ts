import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'admin' })
  readonly username: string

  @IsNotEmpty()
  @ApiProperty({ example: '123456' })
  readonly password: string
}
