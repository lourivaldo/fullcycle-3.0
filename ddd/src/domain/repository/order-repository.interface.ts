import { RepositoryInterface } from './repository.interface';
import Order from '../entity/order';

export interface OrderRepositoryInterface
  extends Omit<RepositoryInterface<Order>, 'update'> {}
