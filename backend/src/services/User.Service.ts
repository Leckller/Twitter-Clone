import { UserModelType } from "../database/models/ModelsSequelize/User.Sequelize";
import UserModel from "../database/models/User.model";
import { ServiceResponse, ServiceResponseError } from "../types/Services.types";
import { User } from "../types/users.types";
import jwt from "../utils/jwt";

type Valid = { valid: boolean };

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default class UserService {
  private db = new UserModel();

  async emailExists(email: string): Promise<Valid> {
    const query = await this.db.findUserByEmail(email);
    if (!query) {
      return { valid: false }
    }
    return { valid: true }
  }
  async tagnameExists(tagName: string): Promise<Valid> {
    const query = await this.db.findUserByEmail(tagName);
    if (!query) {
      return { valid: false }
    }
    return { valid: true }
  }

  async newUser(body: Omit<User, 'id'>): Promise<ServiceResponse<ServiceResponseError | { token: string, user: User }>> {
    const { email, tagName, customName, password, description, picture }: Omit<User, 'id'> = body;
    if (!tagName || !email || !customName || !password) {
      return {
        status: 400, data: { message: "Preencha todos os campos." }
      };
    } if (!emailRegex.test(email)) { return { status: 400, data: { message: 'Email inválido' } }; }

    const verifyEmail = await this.emailExists(email);
    if (verifyEmail.valid) {
      return { status: 401, data: { message: 'Este email já possui cadastro.' } }
    }

    const verifyTagName = await this.emailExists(email);
    if (verifyTagName.valid) {
      return { status: 401, data: { message: 'Este endereco de usuario está em uso.' } }
    }
    const user = await this.db.createUser({ customName, description, email, password, picture, tagName });
    const token = jwt.sign({ email: user.email, id: user.id });
    return { status: 201, data: { token, user } }
  }

  async loginUser(email: string, password: string): Promise<ServiceResponse<ServiceResponseError | { token: string, user: User }>> {
    const user = await this.db.findUserByEmail(email);
    if (!user || user.password !== password) return { status: 400, data: { message: 'Email ou Senha inválidos.' } };
    const token = jwt.sign({ email: user.email, id: user.id });

    return { status: 200, data: { token, user } };
  }

  async deleteUser(id: number, email: string): Promise<ServiceResponse<ServiceResponseError>> {
    const user = await this.db.findUserByEmail(email);
    if (!user) return { status: 400, data: { message: 'Usuário não encontrado.' } }
    if (user.email !== email || user.id !== id) return { status: 400, data: { message: 'Você não tem permissão para isso.' } }
    await this.db.deleteUser(id, email);
    return { status: 200, data: { message: 'Usuário deletado.' } }
  }

  async editUser(fields: string[]) {
    // para implementar no futuro
  }
}