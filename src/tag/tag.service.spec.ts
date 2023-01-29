import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { FormException } from 'src/exception'
import { TagsRo } from 'src/tag/dto/tags.ro'
import { tagFixture } from 'src/tag/tag.fixture'
import { Repository } from 'typeorm'
import { TagEntity } from './tag.entity'
import { TagService } from './tag.service'

describe('TagService', () => {
  let service: TagService
  let repository: Repository<TagEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagService,
        {
          provide: getRepositoryToken(TagEntity),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findAndCount: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<TagService>(TagService)
    repository = module.get(getRepositoryToken(TagEntity))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(repository).toBeDefined()
  })

  describe('createTag', () => {
    it('should return tag entity when create tag given a valid tag', async () => {
      await service.createTag(tagFixture.dto)

      expect(repository.save).toHaveBeenCalledWith(tagFixture.dto)
    })
  })

  describe('find all tags', () => {
    it('should find tags correctly', async () => {
      jest.spyOn(repository, 'findAndCount').mockResolvedValue([[], 0])
      const articlesRo = await service.retrieveTags({ page: 1, limit: 10 })

      expect(articlesRo).toEqual({
        items: [],
        meta: {
          limit: 10,
          currentPage: 1,
          total: 0,
          totalPages: 0,
        },
      } as TagsRo)
      expect(repository.findAndCount).toHaveBeenCalledWith({ order: { createdAt: 'DESC' }, skip: 0, take: 10 })
    })
  })

  describe('getTags', () => {
    it('should return tag entities given existing tag keys', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([tagFixture.entity])

      const result = await service.getTags(['semantic-ui'])

      expect(result).toEqual([tagFixture.entity])
    })

    it('should throw exception given not existed tag key', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([tagFixture.entity])

      await expect(service.getTags(['semantic-ui', 'not-exist']))
        .rejects.toThrow(FormException)
    })
  })
})
