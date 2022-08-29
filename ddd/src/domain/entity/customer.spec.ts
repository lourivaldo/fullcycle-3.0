import Address from './address';
import Customer from './customer';

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Customer('', 'any');
    }).toThrowError('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      new Customer('123', '');
    }).toThrowError('Name is required');
  });

  it('should change name', () => {
    const customer = new Customer('123', 'any');
    customer.changeName('changed');
    expect(customer.name).toEqual('changed');
  });

  it('should throw error change name', () => {
    expect(() => {
      const customer = new Customer('123', 'any');
      customer.changeName('');
    }).toThrowError('Name is required');
  });

  it('should activate customer', () => {
    const customer = new Customer('123', 'any');
    customer.address = new Address('any_street', 123, '99999999', 'any_city');
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it('should throw error when address is undefined when activate a customer', () => {
    expect(() => {
      const customer = new Customer('123', 'any');
      customer.activate();
    }).toThrowError('Address is mandatory to activate a customer');
  });

  it('should deactivate customer', () => {
    const customer = new Customer('123', 'any');
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it('should add reward points', () => {
    const customer = new Customer('1', 'any');
    expect(customer.rewardPoints).toBe(0);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
