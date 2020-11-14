import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { paginate, PaginationRo, PaginationOptions } from 'src/utils/paginate'
import { ArticleEntity } from 'src/article/article.entity'
import { CreateArticleDto } from 'src/article/dto/createArticle.dto'
import { UserEntity } from 'src/user/user.entity'
import { Repository } from 'typeorm/index'

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
    return paginate(this.articleRepository, options)
  }
}
