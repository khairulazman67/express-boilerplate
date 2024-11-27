import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type TxPrismaClient = Omit<
  PrismaClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

export { prisma, TxPrismaClient };
