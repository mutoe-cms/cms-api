import { CategoryEntity } from 'src/category/category.entity'
import { paginate, PaginationRo } from 'src/utils/paginate'
import { Repository, EntityManager, DataSource } from 'typeorm'

describe('# Paginate', () => {
  const entityManager = new EntityManager(new DataSource({ type: 'postgres' }))
  const cat = new Repository(CategoryEntity, entityManager)
  const cats = Array.from({ length: 11 }).fill({}) as CategoryEntity[]

  it('should return correct value given offset with 0', async () => {
    jest.spyOn(cat, 'findAndCount').mockResolvedValue([cats, 11])
    const pagination = await paginate(cat)

    expect(pagination).toEqual({
      items: cats,
      meta: {
        total: 11,
        limit: 10,
        currentPage: 1,
        totalPages: 2,
      },
    } as PaginationRo)
  })

  it('should return correct value given offset with 10', async () => {
    jest.spyOn(cat, 'findAndCount').mockResolvedValue([cats, 11])
    const pagination = await paginate(cat, { limit: 10, order: { id: 'DESC' } })

    expect(pagination).toEqual({
      items: cats,
      meta: {
        total: 11,
        limit: 10,
        currentPage: 1,
        totalPages: 2,
      },
    } as PaginationRo)
  })

  it('should return correct value given total with 10', async () => {
    jest.spyOn(cat, 'findAndCount').mockResolvedValue([cats, 10])
    const pagination = await paginate(cat, { page: 2 })

    expect(pagination).toEqual({
      items: cats,
      meta: {
        total: 10,
        limit: 10,
        currentPage: 2,
        totalPages: 1,
      },
    } as PaginationRo)
  })
})
