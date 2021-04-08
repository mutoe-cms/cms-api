import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from 'src/app/app.controller'
import { CategoryModule } from 'src/category/category.module'
import { validationPipe } from 'src/pipes'
import * as request from 'supertest'
import ormConfig from './orm-config'

describe('Category Module Integration', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(ormConfig),
        CategoryModule,
      ],
      controllers: [AppController],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(validationPipe)
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('/category (POST)', () => {
    it.todo('should return 201 when post a valid create category form')
  })

  describe('/category (GET)', () => {
    it('should return all categories that without parent category', async () => {
      const response = await request(app.getHttpServer())
        .get('/category')

      expect(response.status).toBe(200)
    })
  })

  describe('/category/1 (GET)', () => {
    it.todo('should return category given existed category id')

    it('should return 404 when category not exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/category/1')

      expect(response.status).toBe(404)
    })
  })
})
