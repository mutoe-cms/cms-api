import { ApiProperty } from '@nestjs/swagger'
import { ApiPropertyRichText } from 'src/decorators'
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

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
  @ApiProperty({ example: '2020-08-16T00:04:59.343Z' })
  createdAt: string

  @UpdateDateColumn()
  @ApiProperty({ example: '2020-08-16T00:04:59.343Z' })
  updatedAt: string
}
