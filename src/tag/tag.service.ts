import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateTagDto } from 'src/tag/dto/createTag.dto'
import { TagEntity } from 'src/tag/tag.entity'
import { Repository } from 'typeorm'

@Injectable()
export class TagService {
  constructor (
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async createTag (createTagDto: CreateTagDto): Promise<TagEntity> {
    return await this.tagRepository.save(createTagDto)
  }
}
