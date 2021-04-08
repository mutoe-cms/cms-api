import { CategoryEntity } from 'src/category/category.entity'

export const categoryFixture = {
  entity: {
    id: 1,
    key: 'study-notes',
    label: 'Study notes',
    description: '<p>This is personal study notes</p>',
    children: [],
  } as CategoryEntity,
}
