import { Prisma } from "@prisma/client";
import { prisma } from "@/config";

async function createPoint(data: Prisma.PointUncheckedCreateInput) {
  return prisma.point.create({
    data,
  });
}

async function findByEmployeeIdAndStatus(employeeId: number, status: string) {
  return prisma.point.findMany({
    where: {
      employeeId,
      status,
    },
  });
}

async function findByEmployeeId(employeeId: number) {
  return prisma.point.findFirst({
    where: {
      employeeId,
    },
  });
}

export const pointRepository = {
  createPoint,
  findByEmployeeIdAndStatus,
  findByEmployeeId,
};
