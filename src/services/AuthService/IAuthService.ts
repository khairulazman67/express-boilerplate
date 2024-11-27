import { users } from "@prisma/client";
import {
  createUsersPayload,
  loginPayload,
} from "../../utils/validations/AuthRequest";
import { responseLogin } from "../../types/Auth.type";

export interface IAuthService {
  createUser(data: createUsersPayload): Promise<users | undefined>;
  login(data: loginPayload): Promise<responseLogin>;
  getUsers(): Promise<users[]>;
  refreshToken(refreshToken: string): Promise<any>;
}
