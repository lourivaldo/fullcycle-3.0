import { RepositoryInterface } from '../../../../domain/@shared/repository/repository.interface';
import Product from '../../../../domain/product/entity/product';
import { ProductModel } from './product';
import { ProductRepositoryInterface } from '../../../../domain/product/repository/product-repository.interface';

export class ProductRepository implements ProductRepositoryInterface {
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
