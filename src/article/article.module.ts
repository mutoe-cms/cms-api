import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleController } from 'src/article/article.controller'
import { ArticleEntity } from 'src/article/article.entity'
import { TagEntity } from 'src/tag/tag.entity'
import { UserEntity } from 'src/user/user.entity'
import { UserModule } from 'src/user/user.module'
import { ArticleService } from './article.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleEntity, UserEntity, TagEntity]),
    UserModule,
  ],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
