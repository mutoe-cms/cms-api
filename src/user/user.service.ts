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
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async createUser (userInfo: { email: string, username: string, password: string }): Promise<UserSafeEntity> {
    const userEntity = await this.repository.save(Object.assign(new UserEntity(), userInfo))
    return omit(userEntity, ['password'])
  }

  async findUser (where: FindUserQuery, withPassword: true): Promise<UserEntity | undefined>
  async findUser (where: FindUserQuery, withPassword?: false): Promise<UserSafeEntity | undefined>
  async findUser (where: FindUserQuery, withPassword: boolean = false): Promise<UserEntity | UserSafeEntity | undefined> {
    if (!withPassword) return await this.repository.findOne({ where })

    const select = Object.keys(this.repository.metadata.propertiesMap) as (keyof UserEntity)[]
    return await this.repository.findOne({ where, select })
  }
}
