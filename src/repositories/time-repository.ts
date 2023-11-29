import { Prisma } from "@prisma/client";
import { prisma } from "@/config";

async function createTime(data: Prisma.TimeUncheckedCreateInput) {
  return prisma.time.create({ data });
}

export const timeRepository = {};
