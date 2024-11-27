import { Prisma, PrismaClient, users } from "@prisma/client";
import { prisma, TxPrismaClient } from "../../db";
import { IAuthRepository } from "./IAuthRepository";
import { injectable } from "tsyringe";

@injectable()
export class AuthRepository implements IAuthRepository {
  async createUser(
    data: Prisma.usersUncheckedCreateInput,
    tx: TxPrismaClient | PrismaClient
  ): Promise<users> {
    return tx.users.create({
      data,
    });
  }
  getUser(params: Prisma.usersWhereUniqueInput): Promise<users | null> {
    return prisma.users.findUnique({
      where: params,
    });
  }

  async getUsers(tx: TxPrismaClient | PrismaClient): Promise<users[]> {
    return tx.users.findMany();
  }
}
