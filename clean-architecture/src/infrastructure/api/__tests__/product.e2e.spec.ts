import { app, sequelize } from '../express';
import request from 'supertest'

describe('E2E test for product', function () {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })
  
  it('should create a product', async () => {
    const response = await request(app)
      .post('/product')
      .send({
        name: 'Food',
        price: 100
      });
    
    expect(response.status).toBe(200)
    expect(response.body.name).toBe('Food')
    expect(response.body.price).toBe(100)
  });

  it('should not create a product', async () => {
    const response = await request(app)
      .post('/product')
      .send({
        name: 'Food',
      });

    expect(response.status).toBe(500)
  });
  
  it('should list all products', async () => {
    await request(app)
      .post('/product')
      .send({
        name: 'Food',
        price: 100
      });
    await request(app)
      .post('/product')
      .send({
        name: 'Soap',
        price: 200
      });

    const listResponse = await request(app)
      .get('/product')
      .send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products).toHaveLength(2);
    const product = listResponse.body.products[0];
    expect(product.name).toBe('Food');
    expect(product.price).toBe(100);
    const product1 = listResponse.body.products[1];
    expect(product1.name).toBe('Soap');
    expect(product1.price).toBe(200);
  });
});
