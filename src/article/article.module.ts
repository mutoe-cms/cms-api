import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleController } from 'src/article/article.controller'
import { ArticleEntity } from 'src/article/article.entity'
import { CategoryEntity } from 'src/category/category.entity'
import { CategoryService } from 'src/category/category.service'
import { TagEntity } from 'src/tag/tag.entity'
import { TagService } from 'src/tag/tag.service'
import { UserEntity } from 'src/user/user.entity'
import { UserService } from 'src/user/user.service'
import { ArticleService } from './article.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleEntity, UserEntity, TagEntity, CategoryEntity]),
  ],
  providers: [ArticleService, TagService, CategoryService, UserService],
  controllers: [ArticleController],
})
export class ArticleModule {}
