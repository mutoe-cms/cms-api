import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { ApiPropertyRichText } from 'src/decorators'

export class CreateArticleDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Lorem ipsum' })
  readonly title: string

  @ApiPropertyOptional({ example: ['semantic-ui', 'material-ui'] })
  readonly tags?: string[] = []

  @ApiPropertyRichText()
  readonly content?: string = ''
}
