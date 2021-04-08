import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ApiPropertyDatetime } from 'src/decorators'

export class ProfileRo {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 'foo@example.com' })
  email: string

  @ApiProperty({ example: 'foo' })
  username: string

  @ApiPropertyDatetime()
  createdAt: string

  @ApiPropertyDatetime()
  updatedAt: string

  @ApiPropertyOptional({ example: 'This guy is lazy and has left nothing.' })
  bio?: string

  @ApiPropertyOptional({ example: 'https://picsum.photos/200' })
  image?: string
}
