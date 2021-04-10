import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from 'src/app/app.controller'
import { AuthModule } from 'src/auth/auth.module'
import { categoryFixture } from 'src/category/category.fixture'
import { CategoryModule } from 'src/category/category.module'
import { CreateCategoryDto } from 'src/category/dto/createCategory.dto'
import { validationPipe } from 'src/pipes'
import * as request from 'supertest'
import { getToken } from 'test/testUtils'
import ormConfig from './orm-config'

describe('Category Module Integration', () => {
  let app: INestApplication
  let token: string

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(ormConfig),
        AuthModule,
        CategoryModule,
      ],
      controllers: [AppController],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(validationPipe)
    await app.init()

    token = await getToken(app)
  })

  afterAll(async () => {
    await app.close()
  })

  describe('/category (POST)', () => {
    it('should return 201 when post a valid create category form', async () => {
      const response = await request(app.getHttpServer())
        .post('/category')
        .auth(token, { type: 'bearer' })
        .send(categoryFixture.dto)

      expect(response.status).toBe(201)
      expect(response.body).toEqual(expect.objectContaining({
        id: 1,
        key: 'study-notes',
        label: 'Study notes',
      }))
    })

    it('should return 422 when post an existed category key', async () => {
      const requestBody: CreateCategoryDto = {
        key: 'study-notes',
        label: 'Study notes',
      }
      const response = await request(app.getHttpServer())
        .post('/category')
        .auth(token, { type: 'bearer' })
        .send(requestBody)

      expect(response.status).toBe(422)
      expect(response.body).toEqual({ key: ['isExist'] })
    })
  })

  describe('/category (GET)', () => {
    it('should return all categories that without parent category', async () => {
      const response = await request(app.getHttpServer())
        .get('/category')

      expect(response.status).toBe(200)
    })
  })

  describe('/category/1 (GET)', () => {
    it('should return category given existed category id', async () => {
      const response = await request(app.getHttpServer())
        .get('/category/1')

      expect(response.status).toBe(200)
      expect(response.body).toEqual(expect.objectContaining(categoryFixture.entity))
    })

    it('should return 404 when category not exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/category/999')

      expect(response.status).toBe(404)
    })
  })
})