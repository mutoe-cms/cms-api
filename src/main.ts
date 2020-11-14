import { NestFactory } from '@nestjs/core'
import { AppModule } from 'src/app/app.module'
import { validationPipe } from 'src/pipes'
import { NEST_PORT, SWAGGER_ENABLE } from 'src/config'
import { createSwagger } from 'src/setup'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(validationPipe)
  app.setGlobalPrefix('/api')

  if (SWAGGER_ENABLE) {
    createSwagger(app)
  }

  await app.listen(NEST_PORT)
}

bootstrap().catch(err => console.error(err))
