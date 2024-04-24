import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import PostMock from '../../mocks/post.mocks'
import { app } from '../../../src/app';

chai.use(chaiHttp);
const mock = new PostMock();

describe('/Post', function () {
  beforeEach(function () { sinon.restore(); });

  it('01 - Cria um post', async () => {
    const req = await chai.request(app).post('/post/create').send('mock')

  });

  it('02 - Remove o post anterior', async () => {
    const req = await chai.request(app).post('/post/delete').send('mock')

    expect(req.status).to.be.eq(200);
  });

  it('03 - Erro', async () => {
    const req = await chai.request(app).post('/post/delete').send('mock')

    expect(req.status).to.be.eq(400);
  });
});
