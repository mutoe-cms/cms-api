import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { xor } from 'lodash'
import { FormException } from 'src/exception'
import { CreateTagDto } from 'src/tag/dto/createTag.dto'
import { TagEntity } from 'src/tag/tag.entity'
import { paginate, PaginationOptions, PaginationRo } from 'src/utils/paginate'
import { In, Repository } from 'typeorm'

@Injectable()
export class TagService {
  constructor (
    @InjectRepository(TagEntity)
    private readonly repository: Repository<TagEntity>,
  ) {}

  async createTag (createTagDto: CreateTagDto): Promise<TagEntity> {
    return await this.repository.save(createTagDto)
  }

  async retrieveTags (options: PaginationOptions): Promise<PaginationRo<TagEntity>> {
    return await paginate(this.repository, options)
  }

  async getTags (tags: string[]): Promise<TagEntity[]> {
    const tagEntities = await this.repository.find({ where: { key: In(tags) } })
    const differenceTags = xor(tagEntities.map(entity => entity.key), tags)
    if (differenceTags.length > 0) {
      throw new FormException({ tags: differenceTags.map(tag => `${tag} is not exists.`) })
    }
    return tagEntities
  }
}
