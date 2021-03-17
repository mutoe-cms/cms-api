import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ArticleEntity } from 'src/article/article.entity'
import { CreateArticleDto } from 'src/article/dto/createArticle.dto'
import { UserEntity } from 'src/user/user.entity'
import { paginate, PaginationOptions, PaginationRo } from 'src/utils/paginate'
import { Repository } from 'typeorm'

@Injectable()
export class ArticleService {
  constructor (
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async createArticle (user: UserEntity, createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
    const articleEntity = this.articleRepository.create(createArticleDto)
    articleEntity.user = user
    return await this.articleRepository.save(articleEntity)
  }

  async retrieveArticles (options: PaginationOptions): Promise<PaginationRo<ArticleEntity>> {
    return await paginate(this.articleRepository, options)
  }
}
