import { Sequelize } from "sequelize-typescript";
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import Product from '../../../domain/product/entity/product';
import CreateProductUsecase from './create.product.usecase';

describe("Test create product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUsecase(productRepository);

    const product = new Product("123", "Food", 25);

    await productRepository.create(product);

    const input = {
      name: "Food",
      price: 25,
    };

    const output = {
      id: expect.any(String),
      name: "Food",
      price: 25,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});
