import { ArticleEntity } from 'src/article/article.entity'
import { CreateArticleDto } from 'src/article/dto/createArticle.dto'
import { tagFixture } from 'src/tag/tag.fixture'
import { userFixture } from 'src/user/user.fixture'

export const articleFixture = {
  dto: {
    title: 'Article title',
    tags: ['semantic-ui'],
    content: '# Article content',
  } as CreateArticleDto,

  entity: {
    id: 1,
    title: 'Article title',
    tags: [tagFixture.entity],
    content: '# Article content',
    author: userFixture.entity,
    createdAt: '',
    updatedAt: '',
  } as ArticleEntity,
}
