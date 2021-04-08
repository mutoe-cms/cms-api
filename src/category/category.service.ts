import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CategoryEntity } from 'src/category/category.entity'
import { IsNull, Repository } from 'typeorm'

@Injectable()
export class CategoryService {
  constructor (
    @InjectRepository(CategoryEntity)
    private readonly repository: Repository<CategoryEntity>,
  ) {}

  async retrieveRootCategories (): Promise<CategoryEntity[]> {
    return await this.repository.find({ parent: IsNull() })
  }

  async retrieveCategory (categoryId: number) {
    const categoryEntity = await this.repository.findOne(categoryId)
    if (!categoryEntity) throw new NotFoundException()
    return categoryEntity
  }
}
