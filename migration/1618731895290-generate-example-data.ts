import { MigrationInterface, QueryRunner } from 'typeorm'
import { ArticleEntity } from 'src/article/article.entity'
import { articleFixture } from 'src/article/article.fixture'
import { CategoryEntity } from 'src/category/category.entity'
import { categoryFixture } from 'src/category/category.fixture'
import { TagEntity } from 'src/tag/tag.entity'
import { tagFixture } from 'src/tag/tag.fixture'

export class generateExampleData1618731895290 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.getRepository(CategoryEntity).save(categoryFixture.entity)
    await queryRunner.connection.getRepository(TagEntity).save(tagFixture.entities)
    await queryRunner.connection.getRepository(ArticleEntity).save(articleFixture.entities)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {}
}
