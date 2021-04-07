import { Random } from 'mockjs'
import { ArticleEntity } from 'src/article/article.entity'
import { TagEntity } from 'src/tag/tag.entity'
import { DeepPartial } from 'typeorm/common/DeepPartial'

export const generateArticle = (tags: DeepPartial<TagEntity>[] = []): DeepPartial<ArticleEntity> => ({
  title: Random.title(),
  content: Random.paragraph(),
  author: { id: 1 },
  tags,
})

export const generateArticles = (count = 1, tags: DeepPartial<TagEntity>[] = []): DeepPartial<ArticleEntity>[] => {
  return new Array(count)
    .fill(null)
    .map(() => generateArticle(tags))
}
