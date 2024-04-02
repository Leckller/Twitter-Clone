import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../src/app';
import mocks from '../../mocks';
import PostModel from '../../../src/database/models/Post.Model';
import UserModel from '../../../src/database/models/User.model';

chai.use(chaiHttp);

const { Post, Token } = mocks;

describe('Get, post/profile/:endereco/:page', () => {
  beforeEach(() => {
    sinon.restore()
    const tokenMiddleware = UserModel.build(Token.tokenBuild);
    sinon.stub(UserModel, 'findOne').resolves(tokenMiddleware);
  });

  it('Espera que retorne uma mensagem caso seja um endereço não cadastrado', async () => {
    sinon.restore();

    const tokenMiddleware = UserModel.build(Token.tokenBuild);
    sinon.stub(UserModel, 'findOne')
      .onFirstCall().resolves(tokenMiddleware)
      .onSecondCall().resolves(null);

    const httpRequest = await chai.request(app)
      .get('/post/profile/teste/0')
      .set({ authorization: mocks.User.tokenMock });

    expect(httpRequest.status).to.eq(404);
    console.log(httpRequest.status)
    expect(httpRequest.body).to.have.property('message');
    expect(httpRequest.body.message).to.eq('Usuario não encontrado');
  });

  it('Espera que retorne um Usuario e que possua suas postagens', async () => {

  })
})