import { ArticleEntity } from 'src/article/article.entity'
import { CategoryEntity } from 'src/category/category.entity'
import { TagEntity } from 'src/tag/tag.entity'
import { UserEntity } from 'src/user/user.entity'
import { DataSource, DataSourceOptions } from 'typeorm'
import * as config from './config'

export const allEntities = [
  UserEntity,
  CategoryEntity,
  TagEntity,
  ArticleEntity,
]

export const dataSourceOptions: DataSourceOptions = {
  type: config.TYPEORM_DRIVER as any,
  host: config.TYPEORM_HOST,
  schema: config.TYPEORM_SCHEMA,
  username: config.TYPEORM_USERNAME,
  password: config.TYPEORM_PASSWORD,
  database: config.TYPEORM_DATABASE,
  port: config.TYPEORM_PORT,
  synchronize: config.TYPEORM_SYNCHRONIZE,
  logging: config.TYPEORM_LOGGING,
  dropSchema: config.TYPEORM_DROP_SCHEMA,
  entities: allEntities,
  migrations: ['dist/migration/*.js'],
  migrationsTableName: config.TYPEORM_MIGRATION_TABLE,
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource
