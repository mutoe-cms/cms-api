import { paginate, PaginationRo } from 'src/utils/paginate'
import { Repository } from 'typeorm'

describe('# Paginate', () => {
  const cat = new Repository()
  const cats = new Array(11).fill({})

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
    } as PaginationRo<typeof cat>)
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
    } as PaginationRo<typeof cat>)
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
    } as PaginationRo<typeof cat>)
  })
})
