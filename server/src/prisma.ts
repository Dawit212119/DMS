import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}
const createPrismaWithExtension = () => {
  return new PrismaClient();
};
let prismaClient: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prismaClient = createPrismaWithExtension();
} else {
  if (!global.prisma) {
    global.prisma = createPrismaWithExtension();
  }
  prismaClient = global.prisma;
}
export { prismaClient };
