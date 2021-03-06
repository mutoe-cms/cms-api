import { generateArticles } from 'seed/article.seed'
import { ArticleEntity } from 'src/article/article.entity'
import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'

export class articleSeed1598787532739 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await getRepository(ArticleEntity).save(generateArticles(10))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
  }
}
