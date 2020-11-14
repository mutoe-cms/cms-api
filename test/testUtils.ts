import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'

export const getToken = (app: INestApplication): Promise<string> => {
  return new Promise((resolve, reject) => {
    request(app.getHttpServer()).post('/auth/register')
      .send({
        username: 'admin',
        email: 'admin@cms.com',
        password: '123456',
      })
      .then(response => {
        resolve(response.body.token)
      }, reject)
  })
}

export const mockDate = (date: Date | string | number) => {
  const { Date } = global

  class MockDate extends Date {
    constructor () {
      super(date) // add whatever date you'll expect to get
    }
  }

  (global.Date as any) = MockDate

  return () => {
    global.Date = Date
  }
}
