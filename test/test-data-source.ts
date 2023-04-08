import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { allEntities } from 'src/data-source'
import { DataSource, DataSourceOptions } from 'typeorm'

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
