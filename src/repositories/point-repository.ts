import { Prisma } from "@prisma/client";
import { prisma } from "@/config";
import { notFoundError } from "@/errors";
import { exclude } from "@/utils/prisma-utils";

async function createPoint(employeeId: number, point: Prisma.PointCreateInput) {
  return prisma.point.create({
    data: {
      ...point,
      Employee: { connect: { id: employeeId } },
    },
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

async function getAllPoints(employeeId: number) {
  return prisma.point.findMany({
    where: { employeeId },
  });
}

async function getAllPointsByManager(managerId: number) {
  return prisma.point.findMany({ where: { Employee: { managerId } } });
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

async function approvePoint(pointId: number, data: Prisma.PointUpdateInput) {
  const existingPoint = await prisma.point.findUnique({
    where: {
      id: pointId,
    },
  });

  if (!existingPoint) throw notFoundError();

  return prisma.point.update({
    where: {
      id: pointId,
    },
    data,
  });
}

async function findByEmployeeIdAndDate(employeeId: number, date: string) {
  return prisma.point.findMany({
    where: {
      employeeId,
      date,
    },
  });
}

async function findPointById(pointId: number) {
  return prisma.point.findUnique({
    where: {
      id: pointId,
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
  findPointById,
  getAllPointsByManager,
  approvePoint,
};

export type PointParam = { pointId: number };
