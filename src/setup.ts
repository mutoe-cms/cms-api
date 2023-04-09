import { INestApplication, Logger } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { version } from 'package.json'
import { NEST_PORT } from 'src/config'

export function createSwagger (app: INestApplication): void {
  const logger = new Logger('Swagger')

  const options = new DocumentBuilder()
    .setTitle('CMS')
    .setVersion(version)
    .addBearerAuth()
    .addTag('App', 'Application')
    .addTag('Auth', 'Authorization')
    .addTag('User', 'User')
    .addTag('Article', 'Article')
    .addTag('Tag', 'Tag')
    .addTag('Category', 'Category')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/docs', app, document)

  setTimeout(() => {
    logger.log(`Swagger is started at http://0.0.0.0:${NEST_PORT}/docs`)
  })
}
