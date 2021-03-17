import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { tagFixture } from './dto/fixture/tagFixture'
import { TagEntity } from './tag.entity'
import { Repository } from 'typeorm'
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
})
