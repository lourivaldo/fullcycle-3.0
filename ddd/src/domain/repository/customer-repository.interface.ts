import { RepositoryInterface } from './repository.interface';
import Customer from '../entity/customer';

// eslint-disable-next-line
export interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
