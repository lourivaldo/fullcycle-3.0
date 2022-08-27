import Order from './order';
import OrderItem from './order_item';

describe('Order unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Order('', '123', []);
    }).toThrowError('Id is required');
  });

  it('should throw error when customerId is empty', () => {
    expect(() => {
      new Order('123', '', []);
    }).toThrowError('CustomerId is required');
  });

  it('should throw error when items is empty', () => {
    expect(() => {
      new Order('123', '123', []);
    }).toThrowError('Items are required');
  });

  it('should calculate total', () => {
    const item = new OrderItem('i1', 'any_name', 100, '10', 1);
    const item2 = new OrderItem('i2', 'any_name_2', 200, '20', 1);

    const order1 = new Order('o1', 'c1', [item]);
    expect(order1.total()).toBe(100);

    const order2 = new Order('o2', 'c1', [item, item2]);
    expect(order2.total()).toBe(300);
  });
});
