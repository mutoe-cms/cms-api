import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { omit } from 'lodash'
import { Repository } from 'typeorm'
import { UserEntity, UserSafeEntity } from './user.entity'

interface FindUserQuery {
  id?: number
  username?: string
  email?: string
}

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser (userInfo: { email: string, username: string, password: string }): Promise<UserSafeEntity> {
    const userEntity = await this.userRepository.save(Object.assign(new UserEntity(), userInfo))
    return omit(userEntity, ['password'])
  }

  async findUser (where: FindUserQuery, withPassword = false): Promise<UserEntity> {
    if (!withPassword) return await this.userRepository.findOne({ where })

    const select = Object.keys(this.userRepository.metadata.propertiesMap) as (keyof UserEntity)[]
    return await this.userRepository.findOne({ where, select })
  }
}
