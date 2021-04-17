import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { ArticleEntity } from 'src/article/article.entity'
import { articleFixture } from 'src/article/article.fixture'
import { ArticleService } from 'src/article/article.service'
import { ArticlesRo } from 'src/article/dto/articles.ro'
import { CreateArticleDto } from 'src/article/dto/createArticle.dto'
import { CategoryEntity } from 'src/category/category.entity'
import { categoryFixture } from 'src/category/category.fixture'
import { CategoryService } from 'src/category/category.service'
import { FormException } from 'src/exception'
import { TagEntity } from 'src/tag/tag.entity'
import { tagFixture } from 'src/tag/tag.fixture'
import { TagService } from 'src/tag/tag.service'
import { UserEntity } from 'src/user/user.entity'
import { UserService } from 'src/user/user.service'
import { Repository } from 'typeorm'

describe('Article Service', () => {
  let service: ArticleService
  let userService: UserService
  let categoryService: CategoryService
  let tagService: TagService
  let repository: Repository<ArticleEntity>

  const createArticleDto: CreateArticleDto = {
    title: 'title',
    tags: ['semantic-ui'],
    content: '<p>content</p>',
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        UserService,
        TagService,
        CategoryService,
        {
          provide: getRepositoryToken(ArticleEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            findAndCount: jest.fn(),
            merge: Object.assign,
          },
        },
        {
          provide: getRepositoryToken(TagEntity),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {},
        },
      ],
    }).compile()

    service = module.get(ArticleService)
    userService = module.get(UserService)
    categoryService = module.get(CategoryService)
    tagService = module.get(TagService)
    repository = module.get(getRepositoryToken(ArticleEntity))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(userService).toBeDefined()
    expect(categoryService).toBeDefined()
    expect(tagService).toBeDefined()
    expect(repository).toBeDefined()
  })

  describe('createArticle', () => {
    it('should create article correctly', async function () {
      jest.spyOn(tagService, 'getTags').mockResolvedValue([tagFixture.entity])
      jest.spyOn(categoryService, 'findCategory').mockResolvedValue(categoryFixture.entity)
      jest.spyOn(repository, 'create').mockReturnValue(articleFixture.entity)

      const articleDto: CreateArticleDto = { ...createArticleDto, categoryId: 1 }
      await service.createArticle(articleFixture.entity.id, articleDto)

      expect(repository.save).toBeCalledWith(articleFixture.entity)
    })

    it('should throw error when create article given tags not exist', async function () {
      jest.spyOn(tagService, 'getTags').mockRejectedValue(new FormException({}))
      jest.spyOn(repository, 'create').mockReturnValue({ title: 'foo', content: 'content', id: 1 } as ArticleEntity)

      await expect(
        service.createArticle(1, { title: 'foo', content: 'content', tags: ['not-exist'] }),
      ).rejects.toThrowError(FormException)
    })

    it('should throw error given not existed categoryId', async () => {
      jest.spyOn(tagService, 'getTags').mockResolvedValue([tagFixture.entity])
      jest.spyOn(repository, 'create').mockReturnValue(articleFixture.entity)
      jest.spyOn(categoryService, 'findCategory').mockResolvedValue(undefined)

      const articleDto: CreateArticleDto = { ...createArticleDto, categoryId: 999 }
      await expect(service.createArticle(articleFixture.entity.id, articleDto))
        .rejects.toThrow(FormException)
    })
  })

  describe('retrieveArticles', () => {
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

  describe('retrieveArticle', () => {
    it('should return article entity when article is exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(articleFixture.entity)

      const articleEntity = await service.retrieveArticle(articleFixture.entity.id)

      expect(articleEntity).toEqual(articleFixture.entity)
      expect(repository.findOne).toBeCalledWith(articleFixture.entity.id)
    })

    it('should throw NotFound error when article is not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined)

      await expect(service.retrieveArticle(articleFixture.entity.id))
        .rejects.toThrow(NotFoundException)
    })
  })

  describe('updateArticle', () => {
    it('should return the article when submit a valid article with login', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(articleFixture.entity)
      jest.spyOn(repository, 'save').mockResolvedValue(articleFixture.entity)
      jest.spyOn(tagService, 'getTags').mockResolvedValue([tagFixture.entity])

      const articleEntity = await service.updateArticle(1, createArticleDto, 1)

      expect(repository.save).toBeCalledWith(expect.objectContaining({
        ...createArticleDto,
        tags: [tagFixture.entity],
      }))
      expect(articleEntity).toHaveProperty('id')
    })

    it('should throw NotFound error when article is not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined)
      jest.spyOn(tagService, 'getTags').mockResolvedValue([])

      await expect(service.updateArticle(articleFixture.entity.id, createArticleDto, 1))
        .rejects.toThrow(NotFoundException)
    })

    it('should throw FormException when submit a tag not existed', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(articleFixture.entity)
      jest.spyOn(tagService, 'getTags').mockRejectedValue(new FormException({}))

      const dto = { ...createArticleDto, tags: ['not-exist'] }
      await expect(service.updateArticle(articleFixture.entity.id, dto, 1))
        .rejects.toThrow(FormException)
    })
  })
})
