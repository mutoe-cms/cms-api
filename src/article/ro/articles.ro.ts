import { PaginationRo } from 'src/utils/paginate'
import { ArticleEntity } from 'src/article/article.entity'

export class ArticlesRo extends PaginationRo(ArticleEntity) {}
