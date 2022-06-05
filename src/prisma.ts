import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    log: ['query'], // vai logar no terminal todas as consultas feitas
});