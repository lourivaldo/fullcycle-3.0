import { CustomerFactory } from './customer.factory';
import Address from '../value-object/address';

describe('CustomerFactory', () => {
  it('should create a customer', () => {
    const customer = CustomerFactory.create('John');

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John');
    expect(customer.address).toBeUndefined();
  });

  it('should create a customer with an address', () => {
    const address = new Address('Street', 1, 'zip', 'City');
    const customer = CustomerFactory.createWithAddress('John', address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John');
    expect(customer.address).toBe(address);
  });
});
