import { ArticleEntity } from 'src/article/article.entity'
import { articleFixture } from 'src/article/article.fixture'
import { CategoryEntity } from 'src/category/category.entity'
import { categoryFixture } from 'src/category/category.fixture'
import { TagEntity } from 'src/tag/tag.entity'
import { tagFixture } from 'src/tag/tag.fixture'
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm'

export class generateExampleData1618731895290 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await getRepository(CategoryEntity).save(categoryFixture.entity)
    await getRepository(TagEntity).save(tagFixture.entities)
    await getRepository(ArticleEntity).save(articleFixture.entities)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {}
}
