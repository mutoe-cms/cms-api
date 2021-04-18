import { UserSafeEntity } from 'src/user/user.entity'

const adminEntity: UserSafeEntity = {
  id: 1,
  username: 'admin',
  email: 'admin@cms.mutoe.com',
  bio: '',
  createdAt: '2020-01-01T00:00:00Z',
  updatedAt: '2020-01-01T00:00:00Z',
}

const entity: UserSafeEntity = {
  id: 2,
  username: 'mutoe',
  email: 'imutoe@gmail.com',
  bio: 'This guy is lazy and has left nothing.',
  createdAt: '2020-01-01T00:00:00Z',
  updatedAt: '2020-01-01T00:00:00Z',
}

export const userFixture = {
  adminEntity,
  entity,
}
