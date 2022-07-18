import { Sequelize } from "sequelize-typescript";
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import UpdateProductUsecase from './update.product.usecase';

describe("Test update product use case", () => {
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

  it("should update product", async () => {
    await ProductModel.create({
      id: '1',
      name: 'any_1',
      price: 1,
    })
    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUsecase(productRepository);

    const input = {
      id: '1',
      name: 'any_1_update',
      price: 10,
    };
    const output = {
      id: '1',
      name: 'any_1_update',
      price: 10,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});
