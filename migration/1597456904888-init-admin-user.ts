import { UserEntity } from 'src/user/user.entity'
import { cryptoPassword } from 'src/utils/cryptoPassword'
import { DeepPartial, getRepository, MigrationInterface } from 'typeorm'

export class initAdminUser1597456904888 implements MigrationInterface {
  public async up (): Promise<void> {
    const adminUser: DeepPartial<UserEntity> = {
      id: 1,
      password: cryptoPassword('123456'),
      username: 'admin',
      email: 'admin@cms.mutoe.com',
    }
    await getRepository(UserEntity).save(adminUser)
  }

  public async down (): Promise<void> {}
}
