import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../src/app';
import mocks from '../../mocks';
import UserModel from '../../../src/database/models/User.model'

chai.use(chaiHttp);

