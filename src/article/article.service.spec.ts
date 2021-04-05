import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { ArticleEntity } from 'src/article/article.entity'
import { articleFixture } from 'src/article/article.fixture'
import { ArticleService } from 'src/article/article.service'
import { ArticlesRo } from 'src/article/dto/articles.ro'
import { FormException } from 'src/exception'
import { TagEntity } from 'src/tag/tag.entity'
import { UserSafeEntity } from 'src/user/user.entity'
import { Repository } from 'typeorm'

describe('Article Service', () => {
  let service: ArticleService
  let repository: Repository<ArticleEntity>
  let tagRepository: Repository<TagEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: getRepositoryToken(ArticleEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            findAndCount: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(TagEntity),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get(ArticleService)
    repository = module.get(getRepositoryToken(ArticleEntity))
    tagRepository = module.get(getRepositoryToken(TagEntity))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(repository).toBeDefined()
  })

  describe('create article', () => {
    it('should create article correctly', async function () {
      jest.spyOn(tagRepository, 'find').mockResolvedValue([])
      jest.spyOn(repository, 'create').mockReturnValue({ title: 'foo', content: 'content', id: 1 } as any)
      const user: UserSafeEntity = { id: 1, email: 'mutoe@foxmail.com', username: 'mutoe' } as UserSafeEntity
      await service.createArticle(user, { title: 'foo', tags: [], content: 'content' })

      expect(repository.save).toBeCalledWith({
        id: 1,
        title: 'foo',
        content: 'content',
        user,
      })
    })

    it('should throw error when create article given dto without body', async function () {
      jest.spyOn(repository, 'create').mockReturnValue({ title: 'foo', content: 'content', id: 1 } as any)
      jest.spyOn(tagRepository, 'find').mockResolvedValue([])
      const user: UserSafeEntity = { id: 1, email: 'mutoe@foxmail.com', username: 'mutoe' } as UserSafeEntity
      await expect(
        service.createArticle(user, { title: 'foo', tags: ['semantic-ui'], content: 'content' }),
      ).rejects.toThrowError(FormException)
    })
  })

  describe('find all articles', () => {
    it('should find articles correctly', async function () {
      jest.spyOn(repository, 'findAndCount').mockResolvedValue([[], 0])
      const articlesRo = await service.retrieveArticles({ page: 1, limit: 10 })

      expect(articlesRo).toEqual({
        items: [],
        meta: {
          limit: 10,
          currentPage: 1,
          total: 0,
          totalPages: 0,
        },
      } as ArticlesRo)
      expect(repository.findAndCount).toBeCalledWith({ order: { createdAt: 'DESC' }, skip: 0, take: 10 })
    })
  })

  describe('find one article', () => {
    it('should return article entity when article is exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(articleFixture.entity)
      const articleEntity = await service.retrieveArticle(articleFixture.entity.id)

      expect(articleEntity).toEqual(articleFixture.entity)
      expect(repository.findOne).toBeCalledWith(articleFixture.entity.id)
    })

    it('should throw NotFound error when article is not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined)

      await expect(service.retrieveArticle(articleFixture.entity.id)).rejects.toThrow(NotFoundException)
    })
  })
})
