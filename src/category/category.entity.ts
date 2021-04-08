import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ApiPropertyRichText } from 'src/decorators'
import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number

  @ManyToOne(_type => CategoryEntity, category => category.children)
  @JoinTable()
  @ApiPropertyOptional({ type: CategoryEntity, description: 'Category parent' })
  parent?: CategoryEntity

  @OneToMany(_type => CategoryEntity, category => category.parent)
  @JoinTable()
  @ApiProperty({ type: CategoryEntity, isArray: true, description: 'Category children' })
  children: CategoryEntity[]

  @Column({ type: 'text' })
  @ApiProperty({ example: 'study-notes' })
  key: string

  @Column({ type: 'text' })
  @ApiProperty({ example: 'Study notes' })
  label: string

  @Column({ type: 'text' })
  @ApiPropertyRichText()
  description?: string
}
