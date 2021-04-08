import { Controller, Get, Param } from '@nestjs/common'
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { CategoryEntity } from 'src/category/category.entity'
import { CategoryService } from 'src/category/category.service'

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor (
    private readonly service: CategoryService,
  ) {}

  @Get()
  @ApiOperation({ operationId: 'retrieveRootCategories', summary: 'Retrieve some categories that not have parent category' })
  @ApiOkResponse({ type: CategoryEntity, isArray: true })
  @ApiNotFoundResponse()
  async retrieveRootCategories (): Promise<CategoryEntity[]> {
    return await this.service.retrieveRootCategories()
  }

  @Get(':categoryId')
  @ApiParam({ name: 'categoryId', example: 1, type: 'number' })
  @ApiOperation({ operationId: 'retrieveCategory', summary: 'Retrieve a category' })
  @ApiOkResponse({ type: CategoryEntity })
  @ApiNotFoundResponse()
  async retrieveCategory (@Param('categoryId') categoryId: number): Promise<CategoryEntity> {
    return await this.service.retrieveCategory(categoryId)
  }
}
