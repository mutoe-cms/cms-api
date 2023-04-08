import { MigrationInterface, QueryRunner } from 'typeorm'
import { CategoryEntity } from 'src/category/category.entity'
import { categoryFixture } from 'src/category/category.fixture'

export class initDefaultCategory1618730922165 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.getRepository(CategoryEntity).save(categoryFixture.uncategorizedCategoryEntity)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {}
}
