import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../src/app';
import mocks from '../../mocks/user.mocks';
import UserModel from '../../../src/database/models/User.model'

chai.use(chaiHttp);


describe('Get, /user', () => {
  beforeEach(function () { sinon.restore(); });

  it('retorna erro caso não seja passado um token', async () => {
    const httpResponse = await chai.request(app).get('/user');

    expect(httpResponse.status).to.eq(401);
    expect(httpResponse.body).to.have.property('message');
    expect(httpResponse.body.message).to.eq('Token é obrigatório');
  });

  it('retorna erro caso o token não seja decodificado', async () => {
    const httpResponse = await chai.request(app).get('/user')
      .set({ authorization: mocks.tokenMock + 'broken' });

    expect(httpResponse.status).to.eq(401);
    expect(httpResponse.body).to.have.property('message');
    expect(httpResponse.body.message).to.eq('Token Inválido');
  });

  it('retorna erro caso o token não seja encontrado', async () => {
    sinon.stub(UserModel, 'findOne').resolves(null);

    const httpResponse = await chai.request(app).get('/user')
      .set({ authorization: mocks.tokenMock });

    expect(httpResponse.status).to.eq(401);
    expect(httpResponse.body).to.have.property('message');
    expect(httpResponse.body.message).to.eq('Token Inválido');
  });

  it('cria a variavel envs para passar os dados de usuario para o proximo middleware', async () => {
    const mockResolve = UserModel.build(mocks.bodyMocks.validFields);
    sinon.stub(UserModel, 'findOne').resolves(mockResolve);

    const httpResponse = await chai.request(app).get('/user')
      .set({ authorization: mocks.tokenMock });


    expect(httpResponse.status).to.eq(200);
    expect(httpResponse.body).to.deep.eq(mocks.bodyMocks.validFieldsNoPassword)
  });

})