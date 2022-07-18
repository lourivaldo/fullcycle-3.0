import ListProductUsecase from "./list.product.usecase";
import Product from '../../../domain/product/entity/product';

const product1 = new Product("123", "Food", 25);
const product2 = new Product("456", "Soap", 3);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test for listing products use case", () => {
  it("should list products", async () => {
    const productRepository = MockRepository();
    const usecase = new ListProductUsecase(productRepository);
    
    const output = await usecase.execute({});

    expect(output).toEqual({
      "products": [
        {
          "id": "123",
          "name": "Food",
          "price": 25
        },
        {
          "id": "456",
          "name": "Soap",
          "price": 3
        }
      ]
    });
  });
});
