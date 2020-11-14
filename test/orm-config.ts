import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ArticleEntity } from 'src/article/article.entity'
import { UserEntity } from 'src/user/user.entity'

const ormConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: [ArticleEntity, UserEntity],
  dropSchema: true,
  synchronize: true,
}

export default ormConfig
