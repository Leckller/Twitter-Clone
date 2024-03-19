import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import midds from '../../middlewares'

import app from '../../app';
import mocks from '../../mocks/user.mocks';
import UserModel from '../../database/models/User.model';
import { Request, Response, NextFunction } from 'express';
import { Envs } from '../../middlewares/token.Middleware';
chai.use(chaiHttp);

describe('Token middleware', function () {
  const req = {} as Request & Envs;
  const res = {} as Response;
  const next = function () { } as NextFunction;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    sinon.restore();
  });

  it('Testa se retorna uma mensagem caso nenhum token seja passado', async () => {
    req.headers = { authorization: '' };

    await midds.token(req, res, next);

    console.log(res.status)
  })
});