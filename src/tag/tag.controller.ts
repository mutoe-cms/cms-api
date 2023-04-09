import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiInvalidFormResponse, ApiListResponse } from 'src/decorators'
import { UseJwtGuards } from 'src/guards'
import { CreateTagDto } from 'src/tag/dto/createTag.dto'
import { TagsRo } from 'src/tag/dto/tags.ro'
import { TagEntity } from 'src/tag/tag.entity'
import { TagService } from 'src/tag/tag.service'
import { PaginationRo } from 'src/utils/paginate'

@Controller('tag')
@ApiTags('Tag')
export class TagController {
  constructor (
    private readonly service: TagService,
  ) {}

  @UseJwtGuards()
  @Post('/')
  @ApiOperation({ operationId: 'createTag', summary: 'Create tag' })
  @ApiCreatedResponse({ type: TagEntity })
  @ApiInvalidFormResponse()
  async createTag (@Body() createTagDto: CreateTagDto): Promise<TagEntity> {
    return await this.service.createTag(createTagDto)
  }

  @Get('/')
  @ApiOperation({ operationId: 'retrieveTags', summary: 'Retrieve tags' })
  @ApiListResponse(TagsRo)
  async retrieveTags (
    @Query('page') page: number,
      @Query('limit') limit: number,
  ): Promise<PaginationRo<TagEntity>> {
    return await this.service.retrieveTags({ page, limit })
  }
}
