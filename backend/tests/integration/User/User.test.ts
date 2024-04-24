import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import UserMock from '../../mocks/user.mocks'
import { app } from '../../../src/app';

chai.use(chaiHttp);
const mock = new UserMock();

describe('/User', function () {
  beforeEach(function () { sinon.restore(); });

  it('01 - Testa se é possível criar uma conta', async () => {
    const req = await chai.request(app).post('/user/create').send(mock.createUser)

    expect(req.status).to.be.eq(201);
    expect(req.body).to.deep.eq({})
  });

  it('02 - Realiza o login com a conta anterior', async () => {
    const { password, email } = mock.createUser;
    const req = await chai.request(app).post('/user/login').send({ password, email })

    expect(req.status).to.be.eq(200);
  });

  it('03 - testa se é possível editar dados de uma conta', async () => {
    // const req = await chai.request(app).post('/user/edit').send(mock.createUser)
  });
});
