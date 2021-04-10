import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { xor } from 'lodash'
import { ArticleEntity } from 'src/article/article.entity'
import { CreateArticleDto } from 'src/article/dto/createArticle.dto'
import { CategoryService } from 'src/category/category.service'
import { FormException } from 'src/exception'
import { TagEntity } from 'src/tag/tag.entity'
import { UserService } from 'src/user/user.service'
import { paginate, PaginationOptions, PaginationRo } from 'src/utils/paginate'
import { In, Repository } from 'typeorm'

@Injectable()
export class ArticleService {
  constructor (
    @InjectRepository(ArticleEntity)
    private readonly repository: Repository<ArticleEntity>,
    // TODO: NOT call other module's repository directly, using service call instead.
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  async createArticle (userId: number, createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
    const { categoryId, tags, ...dto } = createArticleDto

    // TODO: skip find tags when not passed tags argument
    const tagEntities = await this.tagRepository.find({ where: { key: In(tags) } })
    const differenceTags = xor(tagEntities.map(entity => entity.key), tags)
    if (differenceTags.length) {
      throw new FormException({ tags: differenceTags.map(tag => `${tag} is not exists.`) })
    }
    const articleEntity = this.repository.create({
      ...dto,
      tags: tagEntities,
      author: await this.userService.findUser({ id: userId }),
    })

    if (categoryId) {
      const categoryEntity = await this.categoryService.findCategory(categoryId)
      if (!categoryEntity) {
        throw new FormException({ categoryId: ['isNotExist'] })
      }
      articleEntity.category = categoryEntity
    }

    return await this.repository.save(articleEntity)
  }

  async retrieveArticles (options: PaginationOptions): Promise<PaginationRo<ArticleEntity>> {
    return await paginate(this.repository, options)
  }

  async retrieveArticle (id: number): Promise<ArticleEntity> {
    const articleEntity = await this.repository.findOne(id)
    if (!articleEntity) throw new NotFoundException()
    return articleEntity
  }

  async updateArticle (id: number, createArticleDto: CreateArticleDto, userId: number): Promise<ArticleEntity> {
    const [tagEntities, articleEntity] = await Promise.all([
      this.tagRepository.find({ where: { key: In(createArticleDto.tags) } }),
      this.repository.findOne(id),
    ])
    if (!articleEntity) {
      throw new NotFoundException()
    }
    const differenceTags = xor(tagEntities.map(entity => entity.key), createArticleDto.tags)
    if (differenceTags.length) {
      throw new FormException({ tags: differenceTags.map(tag => `${tag} is not exists.`) })
    }
    this.repository.merge(articleEntity, {
      ...createArticleDto,
      tags: tagEntities,
      author: { id: userId },
    })
    return await this.repository.save(articleEntity)
  }
}
