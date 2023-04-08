import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'

export const getToken = async (app: INestApplication): Promise<string> => {
  return await new Promise((resolve, reject) => {
    request(app.getHttpServer()).post('/auth/register')
      .send({
        username: 'admin',
        email: 'admin@cms.mutoe.com',
        password: '123456',
      })
      .then(response => {
        resolve(response.body.token)
      }, reject)
  })
}

export const mockDate = (date: Date | string | number): () => void => {
  const { Date } = global

  class MockDate extends Date {
    constructor () {
      super(date) // add whatever date you'll expect to get
    }
  }

  global.Date = MockDate as DateConstructor

  return () => {
    global.Date = Date
  }
}
