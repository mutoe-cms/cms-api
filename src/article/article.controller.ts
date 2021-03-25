import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common'
import { ApiCreatedResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger'
import { ArticleEntity } from 'src/article/article.entity'
import { ArticleService } from 'src/article/article.service'
import { CreateArticleDto } from 'src/article/dto/createArticle.dto'
import { ArticlesRo } from 'src/article/ro/articles.ro'
import { AuthRequest } from 'src/auth/jwt.strategy'
import { ApiListResponse } from 'src/decorators'
import { UseJwtGuards } from 'src/guards'
import { UserService } from 'src/user/user.service'
import { PaginationRo } from 'src/utils/paginate'

@Controller('article')
@ApiTags('Article')
export class ArticleController {
  constructor (
    private readonly userService: UserService,
    private readonly articleService: ArticleService,
  ) {}

  @UseJwtGuards()
  @Post('/')
  @ApiOperation({ operationId: 'createArticle', summary: 'Create article' })
  @ApiCreatedResponse({ type: ArticleEntity })
  @ApiUnprocessableEntityResponse()
  async createArticle (
    @Request() { user }: AuthRequest,
      @Body() createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
    const userEntity = await this.userService.findUser({ id: user.userId })
    return await this.articleService.createArticle(userEntity, createArticleDto)
  }

  @Get('/')
  @ApiOperation({ operationId: 'retrieveArticles', summary: 'Retrieve articles' })
  @ApiListResponse(ArticlesRo)
  async retrieveArticles (
    @Query('page') page: number,
      @Query('limit') limit: number,
  ): Promise<PaginationRo<ArticleEntity>> {
    return await this.articleService.retrieveArticles({ page, limit })
  }
}
