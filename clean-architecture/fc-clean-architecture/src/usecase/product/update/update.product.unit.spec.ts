import UpdateProductUsecase from "./update.product.usecase";
import ProductFactory from '../../../domain/product/factory/product.factory';

const product = ProductFactory.create(
  'a',
  'any',
  1
);


const input = {
  id: product.id,
  name: "any_update",
  price: 100,
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test update product use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUsecase(productRepository);
    
    const output = await usecase.execute(input);

    expect(output).toEqual(input);
  });
});
