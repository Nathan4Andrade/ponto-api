import { Prisma } from "@prisma/client";
import { prisma } from "@/config";
import { notFoundError } from "@/errors";

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

async function getAllPoints() {
  return prisma.point.findMany();
}

async function updatePoint(
  employeeId: number,
  pointId: number,
  data: Prisma.PointUpdateInput
) {
  const existingPoint = await prisma.point.findUnique({
    where: {
      id: pointId,
      employeeId,
    },
  });

  if (!existingPoint) throw notFoundError();

  return prisma.point.update({
    where: {
      employeeId,
      id: pointId,
    },
    data,
  });
}

async function findByEmployeeIdAndDate(employeeId: number, date: Date) {
  return prisma.point.findMany({
    where: {
      employeeId,
      date,
    },
  });
}
export const pointRepository = {
  createPoint,
  findByEmployeeIdAndStatus,
  findByEmployeeId,
  getAllPoints,
  updatePoint,
  findByEmployeeIdAndDate,
};
