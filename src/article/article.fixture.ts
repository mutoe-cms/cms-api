import { ArticleEntity } from 'src/article/article.entity'
import { CreateArticleDto } from 'src/article/dto/createArticle.dto'
import { userFixture } from 'src/user/user.fixture'

export const articleFixture = {
  dto: {
    title: 'Article title',
    tags: [],
    content: '# Article content',
  } as CreateArticleDto,
  entity: {
    id: 1,
    title: 'Article title',
    tags: [],
    content: '# Article content',
    user: userFixture.entity,
    createdAt: '',
    updatedAt: '',
  } as ArticleEntity,
}
