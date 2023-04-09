import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import request from 'supertest'
import { AppController } from 'src/app/app.controller'
import { ArticleModule } from 'src/article/article.module'
import { AuthModule } from 'src/auth/auth.module'
import { LoginDto } from 'src/auth/dto/login.dto'
import { RegisterDto } from 'src/auth/dto/register.dto'
import { UserModule } from 'src/user/user.module'
import { testTypeormOptions } from 'test/test-data-source'

describe('Auth Module Integration', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(testTypeormOptions),
        UserModule,
        AuthModule,
        ArticleModule,
      ],
      controllers: [AppController],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('/auth/register (POST)', () => {
    it('should return 201', async () => {
      const requestBody: RegisterDto = {
        username: 'admin',
        email: 'admin@cms.mutoe.com',
        password: '123456',
      }
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(requestBody)

      expect(response.status).toBe(201)
      expect(response.body).toEqual(expect.objectContaining({
        id: 1,
        username: 'admin',
        email: 'admin@cms.mutoe.com',
        token: expect.any(String),
      }))
      expect(response.body).not.toHaveProperty('password')
    })

    it('should return 422 given exist username', async () => {
      const requestBody: RegisterDto = {
        username: 'admin',
        email: 'admin2@cms.mutoe.com',
        password: '123456',
      }
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(requestBody)

      expect(response.status).toBe(422)
      expect(response.body).toHaveProperty('username', ['isExist'])
    })

    it('should return 422 given exist email', async () => {
      const requestBody: RegisterDto = {
        username: 'admin2',
        email: 'admin@cms.mutoe.com',
        password: '123456',
      }
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(requestBody)

      expect(response.status).toBe(422)
      expect(response.body).toHaveProperty('email', ['isExist'])
    })
  })

  describe('/auth/login (POST)', () => {
    it('should return 200 when login given correct user name and password', async () => {
      const requestBody: LoginDto = {
        username: 'admin',
        password: '123456',
      }
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(requestBody)

      expect(response.status).toBe(200)
      expect(response.body).toEqual(expect.objectContaining({
        id: 1,
        username: 'admin',
        email: 'admin@cms.mutoe.com',
        token: expect.any(String),
      }))
      expect(response.body).not.toHaveProperty('password')
    })

    it('should return 422 when login given incorrect user name', async () => {
      const requestBody: LoginDto = {
        username: 'foo',
        password: '12345678',
      }
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(requestBody)

      expect(response.status).toBe(422)
      expect(response.body).toHaveProperty('username', ['isNotExist'])
    })

    it('should return 422 when login given incorrect password', async () => {
      const requestBody: LoginDto = {
        username: 'admin',
        password: 'invalid',
      }
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(requestBody)

      expect(response.status).toBe(422)
      expect(response.body).toHaveProperty('password', ['isInvalid'])
    })
  })
})
