import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../src/app';
import mocks from '../../mocks';
import UserModel from '../../../src/database/models/User.model'
import PostModel from '../../../src/database/models/Post.Model';

chai.use(chaiHttp);

const { Post } = mocks;

describe('Get Global', () => {
  it('Testa se retorna um erro caso o campo content esteja vazio ou tenha um valor menor que 1 ou maior que 256', async () => {

    const httpRequest = await chai.request(app).post('/post')
      .send({ content: '' }).set({ authorization: mocks.User.tokenMock });

    expect(httpRequest.status).to.eq(411);
    expect(httpRequest.body).to.have.property('message');
    expect(httpRequest.body.message).to.eq('Seu post deve ter pelo menos um caractere');

    const httpRequest3 = await chai.request(app).post('/post')
      .send({ content: Post.text256 }).set({ authorization: mocks.User.tokenMock });

    expect(httpRequest3.status).to.eq(411);
    expect(httpRequest3.body).to.have.property('message');
    expect(httpRequest3.body.message).to.eq('Seu post atingiu o limite de 256 caracteres');

  });

  it('Espera que seja possivel adicionar um post caso passe em todas as validações', async () => {
    const mockResolve = PostModel.build(Post.mockResolve);
    sinon.stub(PostModel, 'create').resolves(mockResolve);

    const httpRequest = await chai.request(app).post('/post')
      .send({ content: 'teste' })
      .set({ authorization: mocks.User.tokenMock });

    expect(httpRequest.status).to.eq(201);
    // expect(httpRequest.body);
  })

});