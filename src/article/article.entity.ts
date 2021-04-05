import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
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

  @ManyToMany(() => TagEntity)
  @JoinTable()
  @ApiProperty({ example: '["semantic-ui"]' })
  tags: TagEntity[]

  @Column({ type: 'text', nullable })
  @ApiPropertyOptional({ description: 'Markdown body', example: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>' })
  content?: string

  @CreateDateColumn()
  @ApiProperty({ example: '2020-08-16T00:04:59.343Z' })
  createdAt: string

  @UpdateDateColumn()
  @ApiProperty({ example: '2020-08-16T00:04:59.343Z' })
  updatedAt: string
}
