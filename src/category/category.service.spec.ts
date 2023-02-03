import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { CategoryEntity } from 'src/category/category.entity'
import { categoryFixture } from 'src/category/category.fixture'
import { FormException } from 'src/exception'
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
            create: jest.fn(),
            save: jest.fn(),
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

  describe('create category', () => {
    it('should return created category given a valid create category form', async () => {
      jest.spyOn(repository, 'create').mockReturnValueOnce(categoryFixture.entity)
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null)

      await service.createCategory(categoryFixture.dto)

      expect(repository.save).toHaveBeenCalledWith(categoryFixture.entity)
    })

    it('should return created category given a valid form and existed parent category id', async () => {
      jest.spyOn(repository, 'create').mockReturnValueOnce(categoryFixture.entity)
      jest.spyOn(repository, 'findOne')
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(categoryFixture.entity)

      await service.createCategory({ ...categoryFixture.dto, parentId: 1 })

      expect(repository.save).toHaveBeenCalledWith(expect.objectContaining({
        ...categoryFixture.entity,
        parent: { id: 1 },
      }))
    })

    it('should throw category key exist error given existed category key', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(categoryFixture.entity)

      await expect(service.createCategory(categoryFixture.dto))
        .rejects.toThrow(FormException)
    })

    it('should throw parent category not found error given not existed parent category id', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null)
      jest.spyOn(repository, 'create').mockReturnValueOnce(categoryFixture.entity)

      await expect(service.createCategory({ ...categoryFixture.dto, parentId: 10 }))
        .rejects.toThrow(FormException)
    })
  })

  describe('retrieve root categories', () => {
    it('should return root categories given empty categories', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([categoryFixture.entity])

      const categoryEntities = await service.retrieveRootCategories()

      expect(categoryEntities).toEqual([categoryFixture.entity])
    })
  })

  describe('findCategory', () => {
    it('should return category given a valid category id', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(categoryFixture.entity)

      const categoryEntity = await service.findCategory(1)

      expect(categoryEntity).toEqual(categoryFixture.entity)
    })

    it('should return null given a not existed category id', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null)

      const result = await service.findCategory(1)

      expect(result).toBeUndefined()
    })
  })
})
