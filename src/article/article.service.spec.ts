import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { ArticleEntity } from 'src/article/article.entity'
import { ArticleService } from 'src/article/article.service'
import { ArticlesRo } from 'src/article/ro/articles.ro'
import { UserEntity } from 'src/user/user.entity'
import { Repository } from 'typeorm'

describe('Article Service', () => {
  let articleService: ArticleService
  let articleRepository: Repository<ArticleEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: getRepositoryToken(ArticleEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findAndCount: jest.fn(),
          },
        },
      ],
    }).compile()

    articleService = module.get(ArticleService)
    articleRepository = module.get(getRepositoryToken(ArticleEntity))
  })

  it('should be defined', () => {
    expect(articleService).toBeDefined()
    expect(articleRepository).toBeDefined()
  })

  describe('create article', () => {
    it('should create article correctly', async function () {
      jest.spyOn(articleRepository, 'create').mockReturnValue({ title: 'foo', content: 'content', id: 1 } as any)
      const user: UserEntity = { id: 1, email: 'mutoe@foxmail.com', username: 'mutoe' } as UserEntity
      await articleService.createArticle(user, { title: 'foo', content: 'content' })

      expect(articleRepository.save).toBeCalledWith({
        id: 1,
        title: 'foo',
        content: 'content',
        user,
      })
    })
  })

  describe('find all articles', () => {
    it('should find articles correctly', async function () {
      jest.spyOn(articleRepository, 'findAndCount').mockResolvedValue([[], 0])
      const articlesRo = await articleService.retrieveArticles({ page: 1, limit: 10 })

      expect(articlesRo).toEqual({
        items: [],
        meta: {
          limit: 10,
          currentPage: 1,
          total: 0,
          totalPages: 0,
        },
      } as ArticlesRo)
      expect(articleRepository.findAndCount).toBeCalledWith({ order: { id: 'DESC' }, skip: 0, take: 10 })
    })
  })
})
