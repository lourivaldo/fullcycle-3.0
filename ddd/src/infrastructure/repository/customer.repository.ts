import { CustomerRepositoryInterface } from '../../domain/repository/customer-repository.interface';
import Customer from '../../domain/entity/customer';
import { CustomerModel } from '../db/sequelize/model/customer';
import Address from '../../domain/entity/address';

export class CustomerRepository implements CustomerRepositoryInterface {
  async create(customer: Customer): Promise<void> {
    await CustomerModel.create({
      id: customer.id,
      name: customer.name,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zip,
      city: customer.address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  }

  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: { id },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error('Customer not found');
    }

    const customer = new Customer(customerModel.id, customerModel.name);
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zipcode,
      customerModel.city,
    );
    customer.changeAddress(address);
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customers = await CustomerModel.findAll();
    return customers.map((customerModel) => {
      const customer = new Customer(customerModel.id, customerModel.name);
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zipcode,
        customerModel.city,
      );
      customer.changeAddress(address);
      customer.addRewardPoints(customerModel.rewardPoints);
      if (customerModel.active) {
        customer.activate();
      }
      return customer;
    });
  }

  async update(customer: Customer): Promise<void> {
    await CustomerModel.update(
      {
        id: customer.id,
        name: customer.name,
        street: customer.address.street,
        number: customer.address.number,
        zipcode: customer.address.zip,
        city: customer.address.city,
        active: customer.isActive(),
        rewardPoints: customer.rewardPoints,
      },
      {
        where: {
          id: customer.id,
        },
      },
    );
  }
}
