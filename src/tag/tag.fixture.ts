import { CreateTagDto } from 'src/tag/dto/createTag.dto'
import { TagEntity } from 'src/tag/tag.entity'

const dto: CreateTagDto = {
  key: 'semantic-ui',
  name: 'Semantic UI',
  description: 'Semantic UI is a smoothly UI library',
}

const entity: TagEntity = {
  key: 'semantic-ui',
  name: 'Semantic UI',
  description: 'Semantic UI is a smoothly UI library',
  createdAt: '2021-04-18T07:51:33.299Z',
  updatedAt: '2021-04-18T07:51:33.299Z',
}

const entities: TagEntity[] = [
  entity,
  {
    key: 'database',
    name: 'Database',
    description: '',
    createdAt: '2021-04-18T07:51:33.299Z',
    updatedAt: '2021-04-18T07:51:33.299Z',
  },
  {
    key: 'linux',
    name: 'Linux',
    description: '',
    createdAt: '2021-04-18T07:51:33.299Z',
    updatedAt: '2021-04-18T07:51:33.299Z',
  },
]

export const tagFixture = {
  dto,
  entity,
  entities,
}
