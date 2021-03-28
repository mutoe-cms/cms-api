import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { xor } from 'lodash'
import { ArticleEntity } from 'src/article/article.entity'
import { CreateArticleDto } from 'src/article/dto/createArticle.dto'
import { FormException } from 'src/exception'
import { TagEntity } from 'src/tag/tag.entity'
import { UserSafeEntity } from 'src/user/user.entity'
import { paginate, PaginationOptions, PaginationRo } from 'src/utils/paginate'
import { In, Repository } from 'typeorm'

@Injectable()
export class ArticleService {
  constructor (
    @InjectRepository(ArticleEntity)
    private readonly repository: Repository<ArticleEntity>,
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async createArticle (user: UserSafeEntity, createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
    const tagEntities = await this.tagRepository.find({ where: { key: In(createArticleDto.tags) } })
    const differenceTags = xor(tagEntities.map(entity => entity.key), createArticleDto.tags)
    if (differenceTags.length) {
      throw new FormException({ tags: differenceTags.map(tag => `${tag} is not exists.`) })
    }
    const articleEntity = this.repository.create({
      ...createArticleDto,
      tags: tagEntities,
    })
    articleEntity.user = user
    return await this.repository.save(articleEntity)
  }

  async retrieveArticles (options: PaginationOptions): Promise<PaginationRo<ArticleEntity>> {
    return await paginate(this.repository, options)
  }
}
