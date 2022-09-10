import { omit } from "lodash"
import { Category } from "./category"

describe('Category Unit Tests', () => {
  test("constructor of category", () => {
    let category = new Category({ name: "Movie" });
    let props = omit(category.props, "createdAt");
    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      isActive: true,
    });
    expect(category.props.createdAt).toBeInstanceOf(Date);

    let createdAt = new Date(); //string
    category = new Category({
      name: "Movie",
      description: "some description",
      isActive: false,
      createdAt,
    });
    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "some description",
      isActive: false,
      createdAt,
    });

    category = new Category({
      name: "Movie",
      description: "other description",
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      description: "other description",
    });

    category = new Category({
      name: "Movie",
      isActive: true,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      isActive: true,
    });

    createdAt = new Date();
    category = new Category({
      name: "Movie",
      createdAt,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      createdAt,
    });

    expect(category.name).toBe("Movie");
    expect(category.description).toBeNull();
    expect(category.isActive).toBeTruthy();
    expect(category.createdAt).toBe(createdAt);
  });

  test("getter of name prop", () => {
    const category = new Category({
      name: 'Movie'
    })
    expect(category.name).toBe('Movie')
  })

  test("getter and setter of description prop", () => {
    let category = new Category({
      name: 'Movie',
    })
    expect(category.description).toBeNull()

    category = new Category({
      name: 'Movie',
      description: 'some description',
    })
    expect(category.description).toBe('some description')

    category = new Category({
      name: 'Movie',
    })
    category['description'] = 'other description'
    expect(category.description).toBe('other description')

    category['description'] = undefined
    expect(category.description).toBeNull()

    category['description'] = null
    expect(category.description).toBeNull()
  })

  test("getter and setter of isActive prop", () => {
    let category = new Category({
      name: 'Movie',
    })
    expect(category.isActive).toBe(true)

    category = new Category({
      name: 'Movie',
      isActive: true
    })
    expect(category.isActive).toBe(true)

    category = new Category({
      name: 'Movie',
      isActive: false
    })
    expect(category.isActive).toBe(false)
  })

  test("getter and setter of createdAt prop", () => {
    const createdAt = new Date();
    let category = new Category({
      name: 'Movie',
      createdAt
    })
    expect(category.isActive).toBe(true)
    expect(category.createdAt).toBe(createdAt)
  })
})
