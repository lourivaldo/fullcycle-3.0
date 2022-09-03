import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '../db/sequelize/model/customer';
import Customer from '../../domain/entity/customer';
import Address from '../../domain/entity/address';
import { CustomerRepository } from './customer.repository';

describe('CustomerRepository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.address = address;
    await customerRepository.create(customer);
    const customerModel = await CustomerModel.findOne({ where: { id: '1' } });
    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
    });
  });

  it('should update a customer', async () => {
    const customerRepo = new CustomerRepository();
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.address = address;
    await customerRepo.create(customer);

    customer.changeName('Customer 2');
    await customerRepo.update(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } });
    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
    });
  });

  it('should find a customer', async () => {
    const customerRepo = new CustomerRepository();
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.address = address;
    await customerRepo.create(customer);

    const customerFound = await customerRepo.find(customer.id);

    expect(customer).toStrictEqual(customerFound);
  });

  it('should throw an error when customer is not found', async () => {
    const customerRepo = new CustomerRepository();

    expect(async () => {
      await customerRepo.find('any');
    }).rejects.toThrow('Customer not found');
  });

  it('should find all customers', async () => {
    const customerRepo = new CustomerRepository();
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.changeAddress(address);
    customer.addRewardPoints(10);
    customer.activate();
    const customer2 = new Customer('2', 'Customer 2');
    const address2 = new Address('Street 2', 2, 'Zipcode 2', 'City 2');
    customer2.changeAddress(address2);
    customer2.addRewardPoints(20);

    await customerRepo.create(customer);
    await customerRepo.create(customer2);

    const customers = await customerRepo.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer);
    expect(customers).toContainEqual(customer2);
  });
});
