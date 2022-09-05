import { OrderModel } from './order';
import { OrderItemModel } from './order-item';
import { OrderRepositoryInterface } from '../../../../domain/checkout/repository/order-repository.interface';
import Order from '../../../../domain/checkout/entity/order';
import OrderItem from '../../../../domain/checkout/entity/order_item';
import { CustomerModel } from '../../../customer/repository/sequelize/customer';

export class OrderRepository implements OrderRepositoryInterface {
  async create(order: Order): Promise<void> {
    await OrderModel.create(
      {
        id: order.id,
        customer_id: order.customerId,
        total: order.total(),
        is_paid: order.isPaid,
        items: order.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price / item.quantity,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      },
    );
  }

  async update(order: Order): Promise<void> {
    await OrderModel.update(
      {
        customer_id: order.customerId,
        total: order.total(),
        is_paid: order.isPaid,
        items: order.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price / item.quantity,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        where: {
          id: order.id,
        },
      },
    );
  }

  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: { id },
        rejectOnEmpty: true,
        include: ['items'],
      });
    } catch (error) {
      throw new Error('Order not found');
    }
    const items = orderModel.items.map((item) => {
      return new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity,
      );
    });
    return new Order(orderModel.id, orderModel.customer_id, items);
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({ include: ['items'] });
    return orders.map((orderModel) => {
      const items = orderModel.items.map((item) => {
        return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity,
        );
      });
      return new Order(orderModel.id, orderModel.customer_id, items);
    });
  }
}
