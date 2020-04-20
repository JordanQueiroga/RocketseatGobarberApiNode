import request from 'supertest';
import bcryptjs from 'bcryptjs';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/trucate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Deve ser possível se cadastrar e gerar o hash', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const compareHash = await bcryptjs.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('Deve ser possível se cadastrar', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('O usuário não deve cadastrar na aplicação com email dublicado', async () => {
    const user = await factory.attrs('User');
    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });
});
