import { EventDispatcher } from './event-dispatcher';
import { SendEmailWhenProductIsCreatedHandler } from '../../product/event/handler/send-email-when-product-is-created.handler';
import { ProductCreatedEvent } from '../../product/event/product-created.event';
import MockDate from 'mockdate';

MockDate.set(new Date('2022-09-04T00:58:18.956Z'));

describe('EventDispatcher', () => {
  it('should register an event handler', async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'],
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(
      1,
    );
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toBe(
      eventHandler,
    );
  });

  it('should unregister an event handler', async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toBe(
      eventHandler,
    );

    eventDispatcher.unregister('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'],
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(
      0,
    );
  });

  it('should unregister an event handler', async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toBe(
      eventHandler,
    );

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'],
    ).toBeUndefined();
  });

  it('should notify all event handlers', async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const eventHandlerSpy = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toBe(
      eventHandler,
    );

    const productCreatedEvent = new ProductCreatedEvent({
      id: '1',
      name: 'Product 1',
    });
    eventDispatcher.notify(productCreatedEvent);

    expect(eventHandlerSpy).toHaveBeenCalledTimes(1);
    expect(eventHandlerSpy).toHaveBeenCalledWith({
      dataTimeOccurred: new Date('2022-09-04T00:58:18.956Z'),
      eventData: {
        id: '1',
        name: 'Product 1',
      },
    });
  });
});
