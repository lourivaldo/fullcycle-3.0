import Product from '../entity/product';
import { RepositoryInterface } from './repository.interface';

// eslint-disable-next-line
export interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
