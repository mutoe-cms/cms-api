import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { ApiPropertyDatetime } from 'src/decorators'
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
  @ApiPropertyDatetime()
    createdAt: string

  @UpdateDateColumn()
  @ApiPropertyDatetime()
    updatedAt: string
}

@Entity('user')
export class UserEntity extends UserSafeEntity {
  @Column({ length: 64, select: false })
  @Exclude()
    password: string

  @BeforeUpdate()
  @BeforeInsert()
  // istanbul ignore next
  hashPassword (): void {
    this.password = cryptoPassword(this.password)
  }
}
