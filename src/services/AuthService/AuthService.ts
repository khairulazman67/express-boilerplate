import { inject, injectable } from "tsyringe";

import jwt, { JwtPayload } from "jsonwebtoken";
import { ForbiddenError } from "../../utils/errors/DynamicCustomError";
import bcrypt from "bcrypt";
import { IAuthService } from "./IAuthService";
import { users } from "@prisma/client";
import {
  createUsersPayload,
  loginPayload,
} from "../../utils/validations/AuthRequest";
import { prisma } from "../../db";
import { IAuthRepository } from "../../repositories/StockOpnameRepository/IAuthRepository";
import { responseLogin } from "../../types/Auth.type";
import redis from "../../redisClient";
import {
  generateAccessToken,
  generateRefreshToken,
  validateRefreshToken,
} from "../../utils/helpers/auth.helper";
import { access } from "fs";

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject("IAuthRepository")
    private authRepository: IAuthRepository
  ) {}

  async createUser(data: createUsersPayload): Promise<users | undefined> {
    try {
      const result = await prisma.$transaction(async (tx) => {
        const saveData = {
          email: data.email,
          password: await bcrypt.hash(data.password, 10),
        };
        return await this.authRepository.createUser(saveData, tx);
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async login(data: loginPayload): Promise<responseLogin> {
    try {
      const user = await this.authRepository.getUser({
        email: data.email,
      });
      if (user && (await bcrypt.compare(data.password, user.password))) {
        return {
          user: {
            id: user.id,
            email: user.email,
          },
          refresh_token: await generateRefreshToken(user),
          access_token: generateAccessToken(user),
        };
      } else {
        throw new ForbiddenError("Email dan password tidak sesuai");
      }
    } catch (error) {
      throw error;
    }
  }

  async refreshToken(refreshToken: string): Promise<any> {
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

    try {
      if (!REFRESH_TOKEN_SECRET)
        throw new ForbiddenError("REFRESH_TOKEN_SECRET is not defined");
      const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as users;

      const isValid = await validateRefreshToken(decoded.id, refreshToken);

      if (!isValid) {
        throw new ForbiddenError("Invalid or expired access token");
      }

      return { access_token: generateAccessToken(decoded) };
    } catch (error) {
      throw error;
    }
  }

  async getUsers(): Promise<users[]> {
    try {
      return await this.authRepository.getUsers(prisma);
    } catch (error) {
      throw error;
    }
  }
}
