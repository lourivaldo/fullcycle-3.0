import Customer from '../../customer/entity/customer';
import OrderService from './order.service';
import OrderItem from '../entity/order_item';

describe('Order service unit tests', () => {
  it('should place an order', () => {
    const customer = new Customer('c1', 'Customer 1');
    const item1 = new OrderItem('i1', 'Item 1', 10, 'p1', 1);

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });
});
