import { ApiResponseProperty } from '@nestjs/swagger'
import { FindConditions, FindManyOptions, ObjectLiteral, Repository } from 'typeorm'

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
}

export async function paginate<T extends ObjectLiteral> (
  repository: Repository<T>,
  options: PaginationOptions = {},
  searchOptions: FindConditions<T> | FindManyOptions<T> = {},
): Promise<PaginationRo<T>> {
  const page = options.page || 1
  const limit = options.limit || 10

  const offset = (page - 1) * limit
  searchOptions = Object.assign({ skip: offset, take: limit, order: { id: 'DESC' } }, searchOptions)
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
