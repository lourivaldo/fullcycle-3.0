import Address from '../value-object/address';
import Customer from './customer';
import { EventDispatcher } from '../../@shared/event/event-dispatcher';
import { SendConsoleLogHandler } from '../event/handler/send-console-log.handler';
import { CustomerAddressUpdatedEvent } from '../event/customer-address-updated.event';
import MockDate from 'mockdate';
import { CustomerCreatedEvent } from '../event/customer-created.event';
import { SendConsoleLog1Handler } from '../event/handler/send-console-log-1.handler';
import { SendConsoleLog2Handler } from '../event/handler/send-console-log-2.handler';

MockDate.set(new Date('2022-09-04T00:58:18.956Z'));

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Customer('', 'any');
    }).toThrowError('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      new Customer('123', '');
    }).toThrowError('Name is required');
  });

  it('should change name', () => {
    const customer = new Customer('123', 'any');
    customer.changeName('changed');
    expect(customer.name).toEqual('changed');
  });

  it('should throw error change name', () => {
    expect(() => {
      const customer = new Customer('123', 'any');
      customer.changeName('');
    }).toThrowError('Name is required');
  });

  it('should activate customer', () => {
    const customer = new Customer('123', 'any');
    customer.address = new Address('any_street', 123, '99999999', 'any_city');
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it('should throw error when address is undefined when activate a customer', () => {
    expect(() => {
      const customer = new Customer('123', 'any');
      customer.activate();
    }).toThrowError('Address is mandatory to activate a customer');
  });

  it('should deactivate customer', () => {
    const customer = new Customer('123', 'any');
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it('should add reward points', () => {
    const customer = new Customer('1', 'any');
    expect(customer.rewardPoints).toBe(0);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });

  it('should change customer address', () => {
    const customer = new Customer('123', 'any');
    const address = new Address('any_street', 123, '99999999', 'any_city');
    customer.changeAddress(address);

    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLogHandler();
    const eventHandlerSpy = jest.spyOn(eventHandler, 'handle');
    const event = new CustomerAddressUpdatedEvent(customer);

    eventDispatcher.register('CustomerAddressUpdatedEvent', eventHandler);
    eventDispatcher.notify(event);

    expect(eventHandlerSpy).toHaveBeenCalledTimes(1);
    expect(eventHandlerSpy).toHaveBeenCalledWith({
      dataTimeOccurred: new Date('2022-09-04T00:58:18.956Z'),
      eventData: customer,
    });
  });

  it('should create customer events', () => {
    const customer = new Customer('123', 'any');

    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();
    const eventHandler1Spy = jest.spyOn(eventHandler1, 'handle');
    const eventHandler2Spy = jest.spyOn(eventHandler2, 'handle');
    const event = new CustomerCreatedEvent(customer);

    eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2);
    eventDispatcher.notify(event);

    expect(eventHandler1Spy).toHaveBeenCalledTimes(1);
    expect(eventHandler2Spy).toHaveBeenCalledTimes(1);
  });
});
