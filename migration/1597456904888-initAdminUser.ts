import { UserEntity } from 'src/user/user.entity'
import { cryptoPassword } from 'src/utils/cryptoPassword'
import { getRepository, MigrationInterface } from 'typeorm'

export class initAdminUser1597456904888 implements MigrationInterface {
  public async up (): Promise<void> {
    await getRepository(UserEntity).save({
      id: 1,
      password: cryptoPassword('123456'),
      username: 'admin',
      email: 'admin@cms.com',
    })
  }

  public async down (): Promise<void> {
    await getRepository(UserEntity).delete({ username: 'admin' })
  }
}
