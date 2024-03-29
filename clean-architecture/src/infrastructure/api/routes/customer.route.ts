import { Request, Response, Router } from 'express';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';
import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usecase';
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase';
import Customer from '../../../domain/customer/entity/customer';
import { CustomerPresenter } from '../presenters/customer.presenter';

export const customerRoute = Router();

customerRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());
  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zip: req.body.address.zip,
      },
    }
    const output = await usecase.execute(customerDto)
    res.send(output);
  } catch (err) {
    res.status(500).send(err)
  }
})

customerRoute.get('/', async (req: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository());
  
  try {
    const output = await usecase.execute({})
    res.format({
      json: async () => res.send(output),
      xml: async () => res.send(CustomerPresenter.listXML(output)),
    })
  } catch (err) {
    res.status(500).send(err)
  }
})
