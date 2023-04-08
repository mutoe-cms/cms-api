import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from 'src/app/app.controller'
import { ArticleModule } from 'src/article/article.module'
import { AuthModule } from 'src/auth/auth.module'
import { CategoryModule } from 'src/category/category.module'
import { dataSourceOptions } from 'src/data-source'
import { TagModule } from 'src/tag/tag.module'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      retryAttempts: 3,
      autoLoadEntities: true,
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
