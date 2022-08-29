import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from '../db/sequelize/model/product';
import Product from '../../domain/entity/product';
import { ProductRepository } from './product.repository';

describe('ProductRepository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const productRepo = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);
    await productRepo.create(product);
    const productModel = await ProductModel.findOne({ where: { id: '1' } });
    expect(productModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 1',
      price: 100,
    });
  });

  it('should update a product', async () => {
    const productRepo = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);
    await productRepo.create(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });
    expect(productModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 1',
      price: 100,
    });

    product.changeName('Product 2');
    product.changePrice(200);

    await productRepo.update(product);

    const productModel2 = await ProductModel.findOne({ where: { id: '1' } });

    expect(productModel2.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 2',
      price: 200,
    });
  });

  it('should find a product', async () => {
    const productRepo = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);
    await productRepo.create(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });

    const productFound = await productRepo.find('1');

    expect(productModel.toJSON()).toStrictEqual({
      id: productFound.id,
      name: productFound.name,
      price: productFound.price,
    });
  });

  it('should find all products', async () => {
    const productRepo = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);
    await productRepo.create(product);
    const product2 = new Product('2', 'Product 2', 200);
    await productRepo.create(product2);

    const foundProducts = await productRepo.findAll();

    expect([product, product2]).toEqual(foundProducts);
  });
});
