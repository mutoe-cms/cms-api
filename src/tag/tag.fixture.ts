import { CreateTagDto } from 'src/tag/dto/createTag.dto'
import { TagEntity } from 'src/tag/tag.entity'

export const tagFixture = {
  dto: {
    key: 'semantic-ui',
    name: 'Semantic UI',
    description: 'Semantic UI is a smoothly UI library',
  } as CreateTagDto,

  entity: {
    key: 'semantic-ui',
    name: 'Semantic UI',
    description: 'Semantic UI is a smoothly UI library',
    createdAt: '',
    updatedAt: '',
  } as TagEntity,
}
