import { Random } from 'mockjs'
import { ArticleEntity } from 'src/article/article.entity'
import { DeepPartial } from 'typeorm/common/DeepPartial'

export const generateArticle = (): DeepPartial<ArticleEntity> => ({
  title: Random.title(),
  content: Random.paragraph(),
  user: { id: 1 },
})

export const generateArticles = (count = 1): DeepPartial<ArticleEntity>[] => {
  return new Array(count)
    .fill(null)
    .map(generateArticle)
}
