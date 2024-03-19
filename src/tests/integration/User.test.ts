import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';
import mocks from '../../mocks/user.mocks';

chai.use(chaiHttp);

describe('Post, /User', function () {
  beforeEach(function () { sinon.restore(); });
  it('Testa se retorna um erro ao não passar um dos campos obrigatorios', async () => {
    const httpResponse = await chai.request(app).post('/user').send(mocks.bodyMocks)

  });

});