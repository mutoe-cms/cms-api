import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from 'src/app/app.controller'
import { AuthModule } from 'src/auth/auth.module'
import { validationPipe } from 'src/pipes'
import { CreateTagDto } from 'src/tag/dto/createTag.dto'
import { TagModule } from 'src/tag/tag.module'
import * as request from 'supertest'
import { getToken, mockDate } from 'test/testUtils'
import ormConfig from './orm-config'

describe('Article Module Integration', () => {
  let app: INestApplication
  let token: string

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(ormConfig),
        TagModule,
        AuthModule,
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

  describe('/tag (POST)', () => {
    it('should return 201 when create tag given an valid form', async () => {
      const restoreMockDate = mockDate('2017-11-25T12:34:56Z')

      const requestBody: CreateTagDto = {
        key: 'semantic-ui',
        name: 'Semantic UI',
        description: '<p>I am description</p>',
      }
      const response = await request(app.getHttpServer())
        .post('/tag')
        .auth(token, { type: 'bearer' })
        .send(requestBody)

      restoreMockDate()

      expect(response.status).toBe(201)
      expect(response.body).toEqual({
        key: 'semantic-ui',
        name: 'Semantic UI',
        description: '<p>I am description</p>',
        createdAt: '2017-11-25T12:34:56.000Z',
        updatedAt: '2017-11-25T12:34:56.000Z',
      })
    })

    it('should return 401 when create tag with invalid token', async () => {
      const requestBody: CreateTagDto = {
        key: 'semantic-ui',
        name: 'Semantic UI',
        description: '<p>I am description</p>',
      }

      const response = await request(app.getHttpServer())
        .post('/tag')
        .send(requestBody)

      expect(response.status).toBe(401)
    })

    it('should return 422 when create tag given an invalid form', async () => {
      const requestBody: CreateTagDto = {
        key: 'semantic-ui',
      } as any

      const response = await request(app.getHttpServer())
        .post('/tag')
        .auth(token, { type: 'bearer' })
        .send(requestBody)

      expect(response.status).toBe(422)
      expect(response.body).toHaveProperty('name', ['isNotEmpty'])
    })
  })

  describe('/tag (GET)', () => {
    it('should return 200 when retrieve tags', async () => {
      const response = await request(app.getHttpServer())
        .get('/tag')

      expect(response.status).toBe(200)
      expect(response.body.meta).toEqual({
        total: 1,
        limit: 10,
        totalPages: 1,
        currentPage: 1,
      })
      expect(response.body.items).toHaveLength(1)
      expect(response.body.items[0]).toEqual(expect.objectContaining({
        key: 'semantic-ui',
        name: 'Semantic UI',
        description: '<p>I am description</p>',
      }))
    })
  })
})
