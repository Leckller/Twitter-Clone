import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import UserMock from '../mocks/user.mocks'
import { app } from '../../src/app';

chai.use(chaiHttp);
const mock = new UserMock();

describe('Teste 1 - Rota User', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('01 - Testa se é possível criar uma conta', async () => {
    const req = await chai.request(app).post('/user/create').send(mock.createUser)

    expect(req.status).to.be.eq(201);
    expect(req.body).to.have.property('token');
    expect(typeof req.body.token).to.be.eq('string');
  });

  it('02 - Realiza o login com a conta anterior', async () => {
    const { password, email } = mock.createUser;
    const reqLogin = await chai.request(app).post('/user/login').send({ password, email });

    const reqDelete = await chai.request(app).delete('/user/delete').set({
      authorization: "Bearer: " + reqLogin.body.token
    });

    expect(reqLogin.status).to.be.eq(200);
    expect(reqLogin.body).to.have.property('token');
    expect(typeof reqLogin.body.token).to.be.eq('string');

    expect(reqDelete.status).to.be.eq(200);
    expect(reqDelete.body).to.deep.eq({ message: 'Usuário deletado.' })
  });
});
