import Customer from '../../customer/entity/customer';
import { randomUUID } from 'crypto';
import OrderItem from '../entity/order_item';
import Order from '../entity/order';

export default class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error('Order must have at least one item');
    }
    const order = new Order(randomUUID(), customer.id, items);
    customer.addRewardPoints(order.total() / 2);
    return order;
  }
}
