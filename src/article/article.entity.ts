import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { UserEntity } from 'src/user/user.entity'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

const nullable = true

@Entity('article')
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number

  @ManyToOne(() => UserEntity, { eager: true, cascade: ['update'] })
  @ApiProperty()
  user: UserEntity

  @Column({ type: 'text' })
  @ApiProperty({ example: 'Lorem ipsum' })
  title: string

  @Column({ type: 'text', nullable })
  @ApiPropertyOptional({ example: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>' })
  content?: string

  @CreateDateColumn()
  @ApiProperty({ example: '2020-08-16T00:04:59.343Z' })
  createdAt: string

  @UpdateDateColumn()
  @ApiProperty({ example: '2020-08-16T00:04:59.343Z' })
  updatedAt: string
}
