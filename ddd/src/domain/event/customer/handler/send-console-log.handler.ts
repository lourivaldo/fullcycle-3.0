import { EventHandlerInterface } from '../../@shared/event-handler.interface';
import { CustomerCreatedEvent } from '../customer-created.event';
import { CustomerAddressUpdatedEvent } from '../customer-address-updated.event';

export class SendConsoleLogHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle({ eventData }: CustomerAddressUpdatedEvent): void {
    const address = '';
    console.log(
      `Endereço do cliente: ${eventData.id}, ${eventData.name} alterado para: ${address}`,
    );
  }
}
