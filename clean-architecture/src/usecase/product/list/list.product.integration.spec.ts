import { Sequelize } from "sequelize-typescript";
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import ListProductUsecase from './list.product.usecase';

describe("Test list product use case", () => {
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

  it("should list products", async () => {
    await ProductModel.create({
      id: '1',
      name: 'any_1',
      price: 1,
    })
    await ProductModel.create({
      id: '2',
      name: 'any_2',
      price: 2,
    })
    const productRepository = new ProductRepository();
    const usecase = new ListProductUsecase(productRepository);

    const input = {};
    const output: any = {
      "products": [
        {
          id: '1',
          name: 'any_1',
          price: 1,
        },
        {
          id: '2',
          name: 'any_2',
          price: 2,
        }
      ]
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});
