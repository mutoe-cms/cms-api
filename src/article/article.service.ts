import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ArticleEntity } from 'src/article/article.entity'
import { CreateArticleDto } from 'src/article/dto/createArticle.dto'
import { CategoryService } from 'src/category/category.service'
import { FormException } from 'src/exception'
import { TagService } from 'src/tag/tag.service'
import { UserService } from 'src/user/user.service'
import { paginate, PaginationOptions, PaginationRo } from 'src/utils/paginate'
import { Repository } from 'typeorm'

@Injectable()
export class ArticleService {
  constructor (
    @InjectRepository(ArticleEntity)
    private readonly repository: Repository<ArticleEntity>,
    private readonly tagService: TagService,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  async createArticle (userId: number, createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
    const { categoryId, tags, ...dto } = createArticleDto

    const articleEntity = this.repository.create({
      ...dto,
      // TODO: skip find user
      author: await this.userService.findUser({ id: userId }),
    })

    if (tags.length) {
      articleEntity.tags = await this.tagService.getTags(tags)
    }

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
    const { tags, ...dto } = createArticleDto
    const [tagEntities, articleEntity] = await Promise.all([
      this.tagService.getTags(tags),
      this.repository.findOne(id),
    ])
    if (!articleEntity) {
      throw new NotFoundException()
    }

    // TODO: update category

    this.repository.merge(articleEntity, {
      ...dto,
      tags: tagEntities,
      author: { id: userId },
    })
    return await this.repository.save(articleEntity)
  }
}
