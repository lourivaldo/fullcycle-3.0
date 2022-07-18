import FindProductUsecase from "./find.product.usecase";
import Product from '../../../domain/product/entity/product';

const product = new Product("123", "Food", 25);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const usecase = new FindProductUsecase(productRepository);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "Food",
      price: 25
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});
