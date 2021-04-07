import { Random } from 'mockjs'
import { TagEntity } from 'src/tag/tag.entity'
import { DeepPartial } from 'typeorm/common/DeepPartial'

export const generateTag = (): DeepPartial<TagEntity> => ({
  name: Random.title(),
  key: Random.word(),
  description: Random.paragraph(),
})

export const generateTags = (count = 1): DeepPartial<TagEntity>[] => {
  return new Array(count)
    .fill(null)
    .map(generateTag)
}
