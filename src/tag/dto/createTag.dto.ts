import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateTagDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Semantic UI' })
  readonly name: string

  @IsNotEmpty()
  @ApiProperty({ example: 'semantic-ui' })
  readonly key: string

  @ApiProperty({ example: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>' })
  readonly description?: string
}
