import CreateProductUsecase from "./create.product.usecase";

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUsecase(productRepository);
    
    const output = await usecase.execute({
      name: 'any',
      price: 1
    });

    expect(output).toEqual({
      id: expect.any(String),
      name: 'any',
      price: 1
    });
  });

  it("should thrown an error when name is missing", async () => {
    const productRepository = MockRepository();
    const createProductUsecase = new CreateProductUsecase(productRepository);

    await expect(createProductUsecase.execute({
      name: '',
      price: 1
    })).rejects.toThrow(
      "Name is required"
    );
  });

  it("should thrown an error when price is lower than 0", async () => {
    const productRepository = MockRepository();
    const createProductUsecase = new CreateProductUsecase(productRepository);

    await expect(createProductUsecase.execute({
      name: 'any',
      price: -1
    })).rejects.toThrow(
      "Price must be greater than zero"
    );
  });

  it("should thrown an error when price is lower than 0", async () => {
    const productRepository = MockRepository();
    const createProductUsecase = new CreateProductUsecase(productRepository);

    await expect(createProductUsecase.execute({
      name: 'any',
      price: 0
    })).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
