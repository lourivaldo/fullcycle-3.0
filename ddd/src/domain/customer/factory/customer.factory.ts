import Customer from '../entity/customer';
import { randomUUID } from 'crypto';
import Address from '../value-object/address';

export class CustomerFactory {
  public static create(name: string) {
    return new Customer(randomUUID(), name);
  }

  public static createWithAddress(name: string, address: Address) {
    const costumer = new Customer(randomUUID(), name);
    costumer.changeAddress(address);
    return costumer;
  }
}
