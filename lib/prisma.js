import { PrismaClient } from "@prisma/client";

/**
 * In development, Next.js reloads files often.
 * This small singleton keeps Prisma from creating too many connections.
 */
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
