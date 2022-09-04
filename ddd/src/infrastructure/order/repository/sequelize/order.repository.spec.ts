import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '../../../customer/repository/sequelize/customer';
import { ProductModel } from '../../../product/repository/sequelize/product';
import { OrderItemModel } from './order-item';
import { OrderModel } from './order';
import { CustomerRepository } from '../../../customer/repository/sequelize/customer.repository';
import Customer from '../../../../domain/customer/entity/customer';
import Address from '../../../../domain/customer/value-object/address';
import { ProductRepository } from '../../../product/repository/sequelize/product.repository';
import Product from '../../../../domain/product/entity/product';
import { OrderRepository } from './order.repository';
import Order from '../../../../domain/checkout/entity/order';
import OrderItem from '../../../../domain/checkout/entity/order_item';

describe('OrderRepository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.address = address;
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2,
    );
    const order = new Order('o1', '1', [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: 'o1',
      customer_id: '1',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price / orderItem.quantity,
          quantity: orderItem.quantity,
          product_id: '1',
          order_id: 'o1',
        },
      ],
    });
  });

  it('should find a order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.address = address;
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2,
    );
    const order = new Order('o1', '1', [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderFound = await orderRepository.find(order.id);
    expect(order).toStrictEqual(orderFound);
  });

  it('should throw an error when order is not found', async () => {
    const orderRepository = new OrderRepository();

    expect(async () => {
      await orderRepository.find('any');
    }).rejects.toThrow('Order not found');
  });

  it('should find all orders', async () => {
    // Customer 1
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.address = address;
    await customerRepository.create(customer);
    // Customer 2
    const customer2 = new Customer('2', 'Customer 2');
    const address2 = new Address('Street 2', 2, 'Zipcode 2', 'City 2');
    customer2.address = address2;
    await customerRepository.create(customer2);
    // Order 1
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);
    await productRepository.create(product);
    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      1,
    );
    const order = new Order('o1', '1', [orderItem]);
    // Order 2
    const product2 = new Product('2', 'Product 2', 200);
    await productRepository.create(product2);
    const orderItem2 = new OrderItem(
      '2',
      product2.name,
      product2.price,
      product2.id,
      2,
    );
    const order2 = new Order('o2', '2', [orderItem2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();

    expect(orders).toHaveLength(2);
    expect(orders).toContainEqual(order);
    expect(orders).toContainEqual(order2);
  });
});
