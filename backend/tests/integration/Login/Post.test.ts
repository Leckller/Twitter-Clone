import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../src/app';
import mocks from '../../mocks';
import UserModel from '../../../src/database/models/User.model'

chai.use(chaiHttp);

const { Login } = mocks;

describe('Post, /Login', () => {

  beforeEach(() => sinon.restore());
  const mockResolves = UserModel.build(Login.mockResolves);

  it('Deve Retornar Uma mensagem de erro caso não seja passado um dos campos obrigatórios', async () => {
    const httpRequest = await chai.request(app).post('/login').send(Login.invalidFields);

    expect(httpRequest.status).to.eq(400);
    expect(httpRequest.body).to.have.property('message');
    expect(httpRequest.body.message).to.eq('Preencha todos os campos')
  });

  it('Deve Retornar Uma mensagem de erro caso não seja encontrado o usuario ou se a senha não corresponder com a salva no banco de dados', async () => {
    sinon.stub(UserModel, 'findOne')
      .onFirstCall().resolves(null)
      .onSecondCall().resolves(mockResolves)

    const httpRequest = await chai.request(app).post('/login').send(Login.validFields);

    expect(httpRequest.status).to.eq(401);
    expect(httpRequest.body).to.have.property('message');
    expect(httpRequest.body.message).to.eq('Senha ou Email inválidos');

    // verifica se quando passar uma senha que não seja a mesma do banco de dados retorne a mesma mensagem

    const httpRequest2 = await chai.request(app).post('/login').send(Login.validFields);

    expect(httpRequest2.status).to.eq(401);
    expect(httpRequest2.body).to.have.property('message');
    expect(httpRequest2.body.message).to.eq('Senha ou Email inválidos')
  });

  it('Deve Retornar um token caso passe nas validações', async () => {
    sinon.stub(UserModel, 'findOne').resolves(mockResolves)

    const httpRequest = await chai.request(app).post('/login').send(Login.validLogin);

    expect(httpRequest.status).to.eq(200);
    expect(httpRequest.body).to.have.property('token');
    expect(typeof httpRequest.body.token).to.eq('string')
  });
})