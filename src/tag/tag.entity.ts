import { ApiProperty } from '@nestjs/swagger'
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { ApiPropertyDatetime, ApiPropertyRichText } from 'src/decorators'

const nullable = true

@Entity('tag')
export class TagEntity {
  @Column({ type: 'text' })
  @PrimaryColumn()
  @ApiProperty({ example: 'semantic-ui' })
    key: string

  @Column({ type: 'text' })
  @ApiProperty({ example: 'Semantic UI' })
    name: string

  @Column({ type: 'text', nullable })
  @ApiPropertyRichText()
    description?: string

  @CreateDateColumn()
  @ApiPropertyDatetime()
    createdAt: string

  @UpdateDateColumn()
  @ApiPropertyDatetime()
    updatedAt: string
}
