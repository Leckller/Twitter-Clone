import { User } from "../types/users.types";

const url = 'http://localhost:8001/user'

export default class UserFetch {
  private token;

  constructor(token: string = '') { this.token = token; }

  async createUser(fields: Omit<User, 'id'>): Promise<any> {
    const Request = await fetch(url + '/create', {
      method: 'POST',
      body: JSON.stringify(fields),
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer: ' + this.token,
      },
    });
    const Response = await Request.json();
    return Response;
  }
  async loginUser(email: string, password: string): Promise<any> {
    const Request = await fetch(url + '/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer: ' + this.token,
      },
    });
    const Response = await Request.json();
    return Response;
  }
  async deleteUser(): Promise<any> {
    const Request = await fetch(url + '/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer: ' + this.token,
      },
    });
    const Response = await Request.json();
    return Response;
  }
}