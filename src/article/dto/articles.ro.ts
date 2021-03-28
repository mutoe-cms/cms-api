import { ArticleEntity } from 'src/article/article.entity'
import { PaginationRo } from 'src/utils/paginate'

export class ArticlesRo extends PaginationRo(ArticleEntity) {}
