import { Body, Controller, Get, NotFoundException, Param, Post, Put, Query, Request } from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger'
import { ArticleEntity } from 'src/article/article.entity'
import { ArticleService } from 'src/article/article.service'
import { ArticlesRo } from 'src/article/dto/articles.ro'
import { CreateArticleDto } from 'src/article/dto/createArticle.dto'
import { AuthRequest } from 'src/auth/jwt.strategy'
import { ApiListResponse } from 'src/decorators'
import { UseJwtGuards } from 'src/guards'
import { PaginationRo } from 'src/utils/paginate'

@Controller('article')
@ApiTags('Article')
export class ArticleController {
  constructor (
    private readonly service: ArticleService,
  ) {}

  @Post('/')
  @UseJwtGuards()
  @ApiOperation({ operationId: 'createArticle', summary: 'Create article' })
  @ApiCreatedResponse({ type: ArticleEntity })
  @ApiUnprocessableEntityResponse()
  async createArticle (
    @Request() { user }: AuthRequest,
      @Body() createArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    return await this.service.createArticle(+user.userId, createArticleDto)
  }

  @Get('/')
  @ApiOperation({ operationId: 'retrieveArticles', summary: 'Retrieve articles' })
  @ApiListResponse(ArticlesRo)
  async retrieveArticles (
    @Query('page') page: number,
      @Query('limit') limit: number,
  ): Promise<PaginationRo<ArticleEntity>> {
    return await this.service.retrieveArticles({ page, limit })
  }

  @Get('/:articleId')
  @ApiOperation({ operationId: 'retrieveArticle', summary: 'Retrieve article by article id' })
  @ApiParam({ name: 'articleId', type: Number, example: '1' })
  @ApiOkResponse({ type: ArticleEntity })
  @ApiNotFoundResponse()
  async retrieveArticle (@Param('articleId') articleId: string): Promise<ArticleEntity> {
    const articleEntity = await this.service.findArticle(+articleId)
    if (!articleEntity) throw new NotFoundException()
    return articleEntity
  }

  @Put('/:articleId')
  @UseJwtGuards()
  @ApiOperation({ operationId: 'updateArticle', summary: 'Update article' })
  @ApiParam({ name: 'articleId', type: Number, example: '1' })
  @ApiOkResponse({ type: ArticleEntity })
  @ApiNotFoundResponse()
  @ApiUnprocessableEntityResponse()
  async updateArticle (
    @Param('articleId') articleId: string,
      @Request() { user }: AuthRequest,
      @Body() createArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    return await this.service.updateArticle(+articleId, createArticleDto, user.userId)
  }
}
