import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../src/app';
import mocks from '../mocks/user.mocks';
import UserModel from '../../src/database/models/User.model'

chai.use(chaiHttp);

describe('Post, /User', function () {
  beforeEach(function () { sinon.restore(); });

  it('retorna uma mensagem caso o email seja invalido', async () => {
    const httpResponse = await chai.request(app)
      .post('/user').send(mocks.bodyMocks.invalidEmail);
    expect(httpResponse.status).to.eq(400);
    expect(httpResponse.body).to.have.property('message');
    expect(httpResponse.body.message).to.eq('Email inválido');
  });

  it('retorna uma mensagem caso a senha seja invalida', async () => {
    const httpResponse = await chai.request(app)
      .post('/user').send(mocks.bodyMocks.invalidPassword);
    expect(httpResponse.status).to.eq(400);
    expect(httpResponse.body).to.have.property('message');
    expect(httpResponse.body.message).to.eq('Sua senha deve ser maior que 8 digitos');
  });

  it('retorna uma mensagem caso algum dos campos obrigatorios esteja vazio', async () => {
    const httpResponse = await chai.request(app)
      .post('/user').send(mocks.bodyMocks.invalidFields);
    expect(httpResponse.status).to.eq(400);
    expect(httpResponse.body).to.have.property('message');
    expect(httpResponse.body.message).to.eq('Preencha os campos email, endereco, name, password');
  });

  it('retorna uma mensagem caso o email já possua cadastro', async () => {
    const mockFindOneReturn = UserModel.build(mocks.bodyMocks.validFields);
    sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);

    const httpResponse = await chai.request(app)
      .post('/user').send(mocks.bodyMocks.validFields);
    expect(httpResponse.status).to.eq(401);
    expect(httpResponse.body).to.have.property('message');
    expect(httpResponse.body.message).to.eq('Este email já possui cadastro');
  });

  it('retorna uma mensagem caso o endereço de usuario já esteja em uso', async () => {
    const mockFindOneReturn = UserModel.build(mocks.bodyMocks.validFields);
    sinon.stub(UserModel, 'findOne').onFirstCall().onSecondCall().resolves(mockFindOneReturn);

    const httpResponse = await chai.request(app)
      .post('/user').send(mocks.bodyMocks.validFields);
    expect(httpResponse.status).to.eq(401);
    expect(httpResponse.body).to.have.property('message');
    expect(httpResponse.body.message).to.eq('Este endereco de usuario está em uso');
  });

  it('retorna um token caso passe em todas as validações', async () => {
    const mockResolves = UserModel.build(mocks.bodyMocks.validFields)
    sinon.stub(UserModel, 'findOne').onFirstCall().resolves(null).onSecondCall().resolves(null);
    sinon.stub(UserModel, 'create').resolves(mockResolves);

    const httpResponse = await chai.request(app)
      .post('/user').send(mocks.bodyMocks.validFields);

    expect(httpResponse.status).to.eq(201);
    expect(httpResponse.body).to.have.property('token');
  });

  it('retorna um token caso passe em todas as validações', async () => {
    const mockResolves = UserModel.build(mocks.bodyMocks.validFields)
    sinon.stub(UserModel, 'findOne').onFirstCall().resolves(null).onSecondCall().resolves(null);
    sinon.stub(UserModel, 'create').resolves(mockResolves);

    const httpResponse = await chai.request(app)
      .post('/user').send(mocks.bodyMocks.validFields);

    expect(httpResponse.status).to.eq(201);
    expect(httpResponse.body).to.have.property('token');
    console.log(httpResponse.body)
  });

  // como lança um erro p teste?
});

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