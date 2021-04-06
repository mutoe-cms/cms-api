import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { ApiPropertyRichText } from 'src/decorators'

export class CreateTagDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Semantic UI' })
  readonly name: string

  @IsNotEmpty()
  @ApiProperty({ example: 'semantic-ui' })
  readonly key: string

  @ApiPropertyRichText()
  readonly description?: string
}
