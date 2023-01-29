import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { ApiPropertyRichText } from 'src/decorators'

export class CreateCategoryDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'study-notes' })
    key: string = ''

  @IsNotEmpty()
  @ApiProperty({ example: 'Study notes' })
    label: string = ''

  @ApiPropertyRichText()
    description?: string = ''

  @ApiPropertyOptional({ example: 1 })
    parentId?: number = Number.NaN
}
