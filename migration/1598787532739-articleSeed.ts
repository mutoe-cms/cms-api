import { generateArticles } from 'seed/article.seed'
import { ArticleEntity } from 'src/article/article.entity'
import { TagEntity } from 'src/tag/tag.entity'
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm'

export class articleSeed1598787532739 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    const tag = await getRepository(TagEntity).findOne()
    await getRepository(ArticleEntity).save(generateArticles(10, [tag]))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
  }
}
