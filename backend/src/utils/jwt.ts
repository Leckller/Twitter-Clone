import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'segredinhoRsrsrsrs';

type TokenPayload = {
  id: number,
  email: string,
};

function sign(payload: TokenPayload): string {
  const token = jwt.sign(payload, secret, { algorithm: 'HS256' });
  return token;
}

function verify(token: string): TokenPayload {
  const data = jwt.verify(token, secret) as TokenPayload;
  return data;
}

export default {
  sign,
  verify,
};