import { ApiResponseProperty } from '@nestjs/swagger'
import { FindConditions, FindManyOptions, FindOneOptions, ObjectLiteral, Repository } from 'typeorm'

export class PaginationMeta {
  @ApiResponseProperty({ example: 15 })
    total: number

  @ApiResponseProperty({ example: 10 })
    limit: number

  @ApiResponseProperty({ example: 2 })
    totalPages: number

  @ApiResponseProperty({ example: 1 })
    currentPage: number
}

export interface PaginationRo<T> {
  items: T[]
  meta: PaginationMeta
}

type ClassType<T = any> = new (...args: any[]) => T

// istanbul ignore next
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-redeclare
export function PaginationRo<T extends ClassType> (ResourceClass: T) {
  class Pagination implements PaginationRo<T> {
    @ApiResponseProperty({ type: [ResourceClass] })
      items: T[]

    @ApiResponseProperty({ type: PaginationMeta })
      meta: PaginationMeta
  }

  return Pagination
}

export interface PaginationOptions {
  page?: number
  limit?: number
  order?: FindOneOptions['order']
}

export async function paginate<T extends ObjectLiteral> (
  repository: Repository<T>,
  options: PaginationOptions = {},
  searchOptions: FindConditions<T> | FindManyOptions<T> = {},
): Promise<PaginationRo<T>> {
  const page = options.page || 1
  const limit = options.limit || 10
  const order = options.order || { createdAt: 'DESC' }

  const offset = (page - 1) * limit
  searchOptions = Object.assign({ skip: offset, take: limit, order }, searchOptions)
  const [items, total] = await repository.findAndCount(searchOptions)

  const totalPages = Math.ceil(total / limit)

  const meta: PaginationMeta = {
    total,
    limit,
    totalPages,
    currentPage: page,
  }

  return { items, meta }
}
