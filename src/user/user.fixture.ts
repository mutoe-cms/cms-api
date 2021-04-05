import { UserSafeEntity } from 'src/user/user.entity'

export const userFixture = {
  entity: {
    id: 1,
    username: 'mutoe',
    email: 'imutoe@gmail.com',
    bio: 'This guy is lazy and has left nothing.',
    createdAt: '2020-01-01T00:00:00Z',
    updatedAt: '2020-01-01T00:00:00Z',
  } as UserSafeEntity,
}
