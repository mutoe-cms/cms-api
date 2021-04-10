import { CategoryEntity } from 'src/category/category.entity'
import { CreateCategoryDto } from 'src/category/dto/createCategory.dto'

export const categoryFixture = {
  dto: {
    key: 'study-notes',
    label: 'Study notes',
    description: '<p>This is personal study notes</p>',
  } as CreateCategoryDto,

  entity: {
    id: 1,
    key: 'study-notes',
    label: 'Study notes',
    description: '<p>This is personal study notes</p>',
  } as CategoryEntity,
}
