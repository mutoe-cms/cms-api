import { Body, Controller, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger'
import { UseJwtGuards } from 'src/guards'
import { CreateTagDto } from 'src/tag/dto/createTag.dto'
import { TagEntity } from 'src/tag/tag.entity'
import { TagService } from 'src/tag/tag.service'

@Controller('tag')
@ApiTags('Tag')
export class TagController {
  constructor (
    private readonly tagService: TagService,
  ) {}

  @UseJwtGuards()
  @Post('/')
  @ApiOperation({ operationId: 'createTag', summary: 'Create tag' })
  @ApiCreatedResponse({ type: TagEntity })
  @ApiUnprocessableEntityResponse()
  async createTag (@Body() createTagDto: CreateTagDto): Promise<TagEntity> {
    return await this.tagService.createTag(createTagDto)
  }
}
