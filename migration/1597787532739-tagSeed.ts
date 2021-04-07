import { generateTags } from 'seed/tag.seed'
import { TagEntity } from 'src/tag/tag.entity'
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm'

export class tagSeed1597787532739 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await getRepository(TagEntity).save(generateTags(10))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
  }
}
