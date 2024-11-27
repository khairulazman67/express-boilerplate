import { Prisma, PrismaClient, users } from "@prisma/client";
import { TxPrismaClient } from "../../db";

export interface IAuthRepository {
  createUser(
    data: Prisma.usersUncheckedCreateInput,
    tx: TxPrismaClient | PrismaClient
  ): Promise<users>;

  getUser(params: Prisma.usersWhereUniqueInput): Promise<users | null>;
  getUsers(tx: TxPrismaClient | PrismaClient): Promise<users[]>;
}
