import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { cryptoPassword } from 'src/utils/cryptoPassword'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

const nullable = true

export class UserSafeEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number

  @Column({ length: 80 })
  @ApiProperty({ example: 'mutoe@foxmail.com' })
  email: string

  @Column({ length: 20 })
  @ApiProperty({ example: 'mutoe' })
  username: string

  @Column({ nullable, type: 'text' })
  @ApiPropertyOptional({ example: 'This guy is lazy and has left nothing.' })
  bio?: string

  @Column({ nullable, type: 'text' })
  @ApiPropertyOptional({ example: 'https://imgur.com/200' })
  image?: string

  @CreateDateColumn()
  @ApiProperty({ example: '2020-08-16T00:04:59.343Z' })
  createdAt: string

  @UpdateDateColumn()
  @ApiProperty({ example: '2020-08-16T00:04:59.343Z' })
  updatedAt: string
}

@Entity('user')
export class UserEntity extends UserSafeEntity {
  @Column({ length: 64, select: false })
  @Exclude()
  password: string

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword (): void {
    this.password = cryptoPassword(this.password)
  }
}
