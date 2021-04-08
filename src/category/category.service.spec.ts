import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { CategoryEntity } from 'src/category/category.entity'
import { categoryFixture } from 'src/category/category.fixture'
import { Repository } from 'typeorm'
import { CategoryService } from './category.service'

describe('CategoryService', () => {
  let service: CategoryService
  let repository: Repository<CategoryEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get(CategoryService)
    repository = module.get(getRepositoryToken(CategoryEntity))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(repository).toBeDefined()
  })

  describe('retrieve root categories', () => {
    it('should return root categories given empty categories', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([categoryFixture.entity])

      const categoryEntities = await service.retrieveRootCategories()

      expect(categoryEntities).toEqual([categoryFixture.entity])
    })
  })

  describe('retrieve one category', () => {
    it('should return category given a valid category id', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(categoryFixture.entity)

      const categoryEntity = await service.retrieveCategory(1)

      expect(categoryEntity).toEqual(categoryFixture.entity)
    })

    it('should throw NotFound error given a not existed category id', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined)

      await expect(
        service.retrieveCategory(1),
      ).rejects.toThrow(NotFoundException)
    })
  })
})
