import Order from '../entity/order';
import OrderItem from '../entity/order_item';

type OrderFactoryProps = {
  id: string;
  customerId: string;
  items: {
    id: string;
    name: string;
    productId: string;
    quantity: number;
    price: number;
  }[];
};

export class OrderFactory {
  public static create(props: OrderFactoryProps) {
    const items = props.items.map((item) => {
      return new OrderItem(
        item.id,
        item.name,
        item.price,
        item.productId,
        item.quantity,
      );
    });
    return new Order(props.id, props.customerId, items);
  }
}
