import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class ProfileRo {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 'foo@example.com' })
  email: string

  @ApiProperty({ example: 'foo' })
  username: string

  @ApiProperty({ example: '2020-08-16T00:04:59.343Z' })
  createdAt: string

  @ApiProperty({ example: '2020-08-16T00:04:59.343Z' })
  updatedAt: string

  @ApiPropertyOptional({ example: null })
  bio?: string

  @ApiPropertyOptional({ example: 'https://picsum.photos/200' })
  image?: string
}
