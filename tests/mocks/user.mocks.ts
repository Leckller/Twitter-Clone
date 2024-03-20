// import { User } from "../types/users.types";
// uso somente para construir, dpois retiro o type para conseguir usar o autocomplete

const bodyMocks = {
  invalidFields: { email: '', endereco: '', name: '', password: '' },
  invalidEmail: { email: 'emailInvalido', endereco: 'jhonsons', name: 'xesquedele', password: '123456789' },
  invalidPassword: { email: 'teste@gmail.com', endereco: 'ruyzada', name: 'Ruyzinho', password: 'senha' },
  validFields: {
    id: 1,
    email: 'tlgd@gmail.com', endereco: 'tomale', name: 'teste', password: '121212121212', pictureUrl: 'defaultPicture'
  },
  validFieldsNoPassword: {
    id: 1, email: 'tlgd@gmail.com', endereco: 'tomale', name: 'teste', pictureUrl: 'defaultPicture'
  },
};

const tokenMock: string = 'Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRsZ2RAZ21haWwuY29tIiwiaWQiOm51bGwsImlhdCI6MTcxMDg2MDU0N30.xnsp6OhA88DoxWr41CKpzNT5Ln0lV2HcSAQc3Kv1Sd4'

export default { bodyMocks, tokenMock };