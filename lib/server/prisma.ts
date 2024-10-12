import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient; // This must be a `var` and not a `let / const`
}

const prisma = new PrismaClient();
if (!global.prisma) {
  global.prisma = prisma;
}

export default prisma;
