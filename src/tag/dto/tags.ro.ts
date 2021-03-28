import { TagEntity } from 'src/tag/tag.entity'
import { PaginationRo } from 'src/utils/paginate'

export class TagsRo extends PaginationRo(TagEntity) {}
