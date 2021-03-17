import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from 'src/app/app.controller'
import { AuthModule } from 'src/auth/auth.module'
import { TagModule } from 'src/tag/tag.module'
import { UserModule } from 'src/user/user.module'
import { ArticleModule } from 'src/article/article.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
    ArticleModule,
    TagModule,
  ],
  exports: [TypeOrmModule],
  controllers: [AppController],
})
export class AppModule {}
