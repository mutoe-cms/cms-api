import { ApiProperty } from '@nestjs/swagger'
import { ApiPropertyRichText } from 'src/decorators'
import { TagEntity } from 'src/tag/tag.entity'
import { UserEntity, UserSafeEntity } from 'src/user/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

const nullable = true

@Entity('article')
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number

  @ManyToOne(() => UserEntity, { eager: true, cascade: ['update'] })
  @ApiProperty({ type: UserSafeEntity, description: 'Article author' })
  author: UserSafeEntity

  @Column({ type: 'text' })
  @ApiProperty({ example: 'Lorem ipsum' })
  title: string

  @ManyToMany(() => TagEntity, { eager: true })
  @JoinTable()
  @ApiProperty({ type: TagEntity, isArray: true, description: 'Article tags' })
  tags: TagEntity[]

  @Column({ type: 'text', nullable })
  @ApiPropertyRichText()
  content?: string

  @CreateDateColumn()
  @ApiProperty({ example: '2020-08-16T00:04:59.343Z' })
  createdAt: string

  @UpdateDateColumn()
  @ApiProperty({ example: '2020-08-16T00:04:59.343Z' })
  updatedAt: string
}
