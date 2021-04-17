import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from 'src/app/app.controller'
import { ArticleModule } from 'src/article/article.module'
import { AuthModule } from 'src/auth/auth.module'
import { CategoryModule } from 'src/category/category.module'
import { TagModule } from 'src/tag/tag.module'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
    }),
    TypeOrmModule.forRoot(),
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
