import { EventDispatcher } from './event-dispatcher';
import { SendEmailWhenProductIsCreatedHandler } from '../product/handler/send-email-when-product-is-created.handler';

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
});
