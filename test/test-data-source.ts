import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DataSource, DataSourceOptions } from 'typeorm'
import { allEntities } from 'src/data-source'

export const testDataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: allEntities,
  dropSchema: true,
  synchronize: true,
}

export const testDataSource = new DataSource(testDataSourceOptions)

export const testTypeormOptions: TypeOrmModuleOptions = {
  ...testDataSourceOptions,
}
