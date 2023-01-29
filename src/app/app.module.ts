import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from 'src/app/app.controller'
import { ArticleModule } from 'src/article/article.module'
import { AuthModule } from 'src/auth/auth.module'
import { CategoryModule } from 'src/category/category.module'
import { TagModule } from 'src/tag/tag.module'
import { UserModule } from 'src/user/user.module'
import * as config from '../config'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: config.TYPEORM_DRIVER as any,
      host: config.TYPEORM_HOST,
      username: config.TYPEORM_USERNAME,
      password: config.TYPEORM_PASSWORD,
      database: config.TYPEORM_DATABASE,
      port: config.TYPEORM_PORT,
      synchronize: config.TYPEORM_SYNCHRONIZE,
      logging: config.TYPEORM_LOGGING,
      autoLoadEntities: true,
      dropSchema: config.TYPEORM_DROP_SCHEMA,
      migrationsRun: true,
      migrations: ['dist/migration/*.js'],
    }),
    UserModule,
    AuthModule,
    ArticleModule,
    CategoryModule,
    TagModule,
  ],
  exports: [TypeOrmModule],
  controllers: [AppController],
})
export class AppModule {}
