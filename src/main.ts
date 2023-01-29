import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { config } from 'dotenv-flow'
import { AppModule } from 'src/app/app.module'
import { NEST_PORT, PROD, SWAGGER_ENABLE } from 'src/config'
import { validationPipe } from 'src/pipes'
import { createSwagger } from 'src/setup'

config()

async function bootstrap () {
  const app = await NestFactory.create(AppModule, {
    cors: !PROD,
  })
  app.useGlobalPipes(validationPipe)
  app.setGlobalPrefix('/api')

  if (SWAGGER_ENABLE) {
    createSwagger(app)
    setTimeout(() => {
      new Logger('Swagger').log(`Swagger is started at http://0.0.0.0:${NEST_PORT}/docs`)
    })
  }

  await app.listen(NEST_PORT)

  new Logger('NestApplication').log(`Listening http://0.0.0.0:${NEST_PORT}`)
}

bootstrap().catch(error => console.error(error))
