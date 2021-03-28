import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { TagsRo } from 'src/tag/dto/tags.ro'
import { Repository } from 'typeorm'
import { tagFixture } from './dto/fixture/tagFixture'
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
  })

  describe('createTag', () => {
    it('should return tag entity when create tag given a valid tag', async () => {
      await service.createTag(tagFixture.dto)

      expect(repository.save).toBeCalledWith(tagFixture.dto)
    })
  })

  describe('find all tags', () => {
    it('should find tags correctly', async function () {
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
      expect(repository.findAndCount).toBeCalledWith({ order: { createdAt: 'DESC' }, skip: 0, take: 10 })
    })
  })
})
