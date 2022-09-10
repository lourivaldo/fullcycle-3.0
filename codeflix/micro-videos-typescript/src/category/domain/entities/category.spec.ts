import { Category } from "./category"

describe('Category', () => {
  it('should create category', () => {
    const category = new Category("Movie")
    
    expect(category.name).toBe('Movie')
  })
})
