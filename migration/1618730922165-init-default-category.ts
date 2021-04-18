import { CategoryEntity } from 'src/category/category.entity'
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm'

export class initDefaultCategory1618730922165 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await getRepository(CategoryEntity).save({
      key: 'uncategorized',
      label: 'Uncategorized',
      description: '',
    })
  }

  public async down (queryRunner: QueryRunner): Promise<void> {}
}
