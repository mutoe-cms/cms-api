import { ArticleEntity } from 'src/article/article.entity'
import { UserEntity } from 'src/user/user.entity'
import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'

export class articleSeed1598787532739 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    const user = await getRepository(UserEntity).findOne({ username: 'admin' })
    const articleEntities = require('./fixtures/articles.json').map((article: any) => {
      article.user = user
      return article
    })
    await getRepository(ArticleEntity).save(articleEntities)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await getRepository(ArticleEntity).delete(1)
  }
}
