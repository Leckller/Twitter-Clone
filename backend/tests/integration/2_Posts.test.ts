import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import PostMock from '../mocks/post.mocks'
import { app } from '../../src/app';
import UserMock from '../mocks/user.mocks';

chai.use(chaiHttp);
const { createUser, createUser2, createUser3 } = new UserMock();
const mock = new PostMock();
const { email, password } = createUser;

describe('Teste 2 - Post', function () {
  beforeEach(function () { sinon.restore(); });

  it('01 - Cria um post', async () => {
    const reqLoginMorgh = await chai.request(app).post('/user/create').send(createUser3)
    const reqLoginAle = await chai.request(app).post('/user/create').send(createUser2)

    const reqRuy = await chai.request(app).post('/post/create')
      .set({ authorization: "Bearer: " + reqLoginMorgh.body.token })
      .send(mock.validContet);

    await chai.request(app).post('/post/create')
      .set({ authorization: "Bearer: " + reqLoginAle.body.token })
      .send(mock.validContet2);


    expect(reqRuy.status).to.be.eq(201);
    expect(reqRuy.body).to.have.property('posted');
    expect(reqRuy.body).to.have.property('content');
    expect(reqRuy.body).to.have.property('userId');
  });

  it('02 - Verifica se retorna postagens na rota global', async () => {
    const req = await chai.request(app).get('/post/global/0');

    console.log(req.body)

    expect(req.status).to.be.eq(200);
  });

  // it('03 - Erro', async () => {
  //   const req = await chai.request(app).delete('/post/delete').send('mock')

  //   expect(req.status).to.be.eq(400);
  // });
});
