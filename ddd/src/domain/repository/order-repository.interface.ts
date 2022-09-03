import { RepositoryInterface } from './repository.interface';
import Order from '../entity/order';

// eslint-disable-next-line
export interface OrderRepositoryInterface
  extends RepositoryInterface<Order> {}
