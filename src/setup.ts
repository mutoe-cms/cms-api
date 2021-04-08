import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { version } from 'package.json'

export function createSwagger (app: INestApplication) {
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
}
