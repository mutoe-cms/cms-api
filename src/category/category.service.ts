import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CategoryEntity } from 'src/category/category.entity'
import { CreateCategoryDto } from 'src/category/dto/createCategory.dto'
import { FormException } from 'src/exception'
import { IsNull, Repository } from 'typeorm'

@Injectable()
export class CategoryService {
  constructor (
    @InjectRepository(CategoryEntity)
    private readonly repository: Repository<CategoryEntity>,
  ) {}

  async createCategory (dto: CreateCategoryDto): Promise<CategoryEntity> {
    let categoryEntity = await this.repository.findOne({ key: dto.key })
    if (categoryEntity) {
      throw new FormException({ key: ['isExist'] })
    }

    categoryEntity = this.repository.create({ ...dto })

    if (dto.parentId) {
      const parentCategory = await this.repository.findOne(dto.parentId)
      if (!parentCategory) {
        throw new FormException({ parentId: ['isNotExist'] })
      }
      categoryEntity.parent = { id: dto.parentId } as CategoryEntity
    }

    return await this.repository.save(categoryEntity)
  }

  async retrieveRootCategories (): Promise<CategoryEntity[]> {
    return await this.repository.find({ parent: IsNull() })
  }

  async findCategory (categoryId: number): Promise<CategoryEntity | undefined> {
    return await this.repository.findOne(categoryId)
  }
}
