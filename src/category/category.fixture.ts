import { CategoryEntity } from 'src/category/category.entity'
import { CreateCategoryDto } from 'src/category/dto/createCategory.dto'

const dto: CreateCategoryDto = {
  key: 'study-notes',
  label: 'Study notes',
  description: '<p>This is personal study notes</p>',
}

const uncategorizedCategoryEntity: CategoryEntity = {
  id: 1,
  key: 'uncategorized',
  label: 'Uncategorized',
  description: '',
  children: [],
  createdAt: '2021-04-18T07:51:33.299Z',
  updatedAt: '2021-04-18T07:51:33.299Z',
}

const entity: CategoryEntity = {
  id: 2,
  key: 'study-notes',
  label: 'Study notes',
  description: '<p>This is personal study notes</p>',
  children: [],
  createdAt: '2021-04-18T07:51:33.299Z',
  updatedAt: '2021-04-18T07:51:33.299Z',
}

const entities: CategoryEntity[] = [
  uncategorizedCategoryEntity,
  entity,
]

export const categoryFixture = {
  dto,
  uncategorizedCategoryEntity,
  entity,
  entities,
}
