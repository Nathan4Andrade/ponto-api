import { Point } from "@prisma/client";
import { employeeRepository, pointRepository } from "@/repositories/";
import { duplicatePointError, notFoundError, permissionError } from "@/errors";

export async function createPoint({
  employeeId,
  status,
  date,
  entryTime,
  justification,
}: CreatePointParams): Promise<Point> {
  const employeeExists = await employeeRepository.findById(employeeId);
  if (!employeeExists) throw notFoundError();

  const existingPoints = await pointRepository.findByEmployeeIdAndDate(
    employeeId,
    date
  );

  if (existingPoints.length > 0) throw duplicatePointError();

  return pointRepository.createPoint({
    employeeId,
    date: date || new Date(),
    status: status || "PENDING",
    entryTime: new Date(`${date} ${entryTime}`),
    exitTime: null,
    justification: justification || null,
  });
}

export async function getAllPoints() {
  return pointRepository.getAllPoints();
}

export function getPointByEmployeeId(employeeId: number) {
  return pointRepository.findByEmployeeId(employeeId);
}

export function getPointsByEmployeeIdAndStatus(
  employeeId: number,
  status: string
) {
  return pointRepository.findByEmployeeIdAndStatus(employeeId, status);
}

export function endPoint(employeeId: number, pointId: number, exitTime: Date) {
  return pointRepository.updatePoint(employeeId, pointId, {
    exitTime: exitTime,
    status: "PENDING",
  });
}

export function justifyPoint(
  employeeId: number,
  pointId: number,
  justification: string
) {
  return pointRepository.updatePoint(employeeId, pointId, {
    justification,
    status: "PENDING",
  });
}

export function approvePoint(employeeId: number, pointId: number) {
  if (!employeeRepository.hasPermission(employeeId)) throw permissionError();

  return pointRepository.updatePoint(employeeId, pointId, {
    status: "APPROVED",
  });
}

export type CreatePointParams = Pick<
  Point,
  "employeeId" | "date" | "status" | "entryTime" | "exitTime" | "justification"
>;

export const pointService = {
  createPoint,
  getAllPoints,
  getPointByEmployeeId,
  getPointsByEmployeeIdAndStatus,
  endPoint,
  justifyPoint,
  approvePoint,
};
