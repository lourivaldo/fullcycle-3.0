import { RepositoryInterface } from '../../domain/repository/repository.interface';
import Product from '../../domain/entity/product';
import { ProductModel } from '../db/sequelize/model/product';

export class ProductRepository implements RepositoryInterface<Product> {
  async create(product: Product): Promise<void> {
    await ProductModel.create({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  }

  async find(id: string): Promise<Product> {
    const product = await ProductModel.findOne({
      where: { id },
    });
    return new Product(product.id, product.name, product.price);
  }

  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();
    return products.map(
      (product) => new Product(product.id, product.name, product.price),
    );
  }

  async update(product: Product): Promise<void> {
    await ProductModel.update(
      {
        name: product.name,
        price: product.price,
      },
      {
        where: {
          id: product.id,
        },
      },
    );
  }
}
