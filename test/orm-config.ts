import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ArticleEntity } from 'src/article/article.entity'
import { TagEntity } from 'src/tag/tag.entity'
import { UserEntity } from 'src/user/user.entity'

const ormConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: [ArticleEntity, UserEntity, TagEntity],
  dropSchema: true,
  synchronize: true,
}

export default ormConfig
