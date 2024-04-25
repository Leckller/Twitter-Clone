import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import PostMock from '../../mocks/post.mocks'
import { app } from '../../../src/app';
import UserMock from '../../mocks/user.mocks';

chai.use(chaiHttp);
const { createUser } = new UserMock();
const mock = new PostMock();
const { email, password } = createUser;

describe('/Post', function () {
  beforeEach(function () { sinon.restore(); });

  it('01 - Cria um post', async () => {
    await chai.request(app).post('/user/create').send(createUser)
    const reqLogin = await chai.request(app).post('/user/login').send({ password, email });

    const req = await chai.request(app).post('/post/create')
      .set({ authorization: "Bearer: " + reqLogin.body.token })
      .send(mock.validContet);

    await chai.request(app).delete('/user/delete').set({
      authorization: "Bearer: " + reqLogin.body.token
    });

    expect(req.status).to.be.eq(201);
    expect(req.body).to.have.property('posted');
    expect(req.body).to.have.property('content');
    expect(req.body).to.have.property('userId');

  });

  // it('02 - Remove o post anterior', async () => {
  //   const req = await chai.request(app).delete('/post/delete').send('mock')

  //   expect(req.status).to.be.eq(200);
  // });

  // it('03 - Erro', async () => {
  //   const req = await chai.request(app).delete('/post/delete').send('mock')

  //   expect(req.status).to.be.eq(400);
  // });
});
