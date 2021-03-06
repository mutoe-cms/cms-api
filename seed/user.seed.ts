import { Random } from 'mockjs'
import { UserEntity } from 'src/user/user.entity'
import { cryptoPassword } from 'src/utils/cryptoPassword'
import { DeepPartial } from 'typeorm/common/DeepPartial'

export const generateUser = (): DeepPartial<UserEntity> => ({
  username: Random.first(),
  email: Random.email(),
  password: cryptoPassword('123456'),
})

export const generateUsers = (count = 1): DeepPartial<UserEntity>[] => {
  return new Array(count)
    .fill(null)
    .map(generateUser)
}
