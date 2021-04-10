import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ApiPropertyDatetime, ApiPropertyRichText } from 'src/decorators'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from 'typeorm'

@Entity('category')
@Tree('closure-table')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number

  @TreeParent()
  @ApiPropertyOptional({ type: CategoryEntity, description: 'Category parent' })
  parent?: CategoryEntity

  @TreeChildren()
  @ApiProperty({ type: CategoryEntity, isArray: true, description: 'Category children' })
  children: CategoryEntity[]

  @Column({ type: 'text', unique: true })
  @ApiProperty({ example: 'study-notes' })
  key: string

  @Column({ type: 'text' })
  @ApiProperty({ example: 'Study notes' })
  label: string

  @Column({ type: 'text' })
  @ApiPropertyRichText()
  description?: string

  @CreateDateColumn()
  @ApiPropertyDatetime()
  createdAt: string

  @UpdateDateColumn()
  @ApiPropertyDatetime()
  updatedAt: string
}
