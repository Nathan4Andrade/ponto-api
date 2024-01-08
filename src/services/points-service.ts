import { Point } from "@prisma/client";
import { employeeRepository, pointRepository } from "@/repositories/";
import { duplicatePointError, notFoundError, permissionError } from "@/errors";
import dayjs from "dayjs";

export async function createPoint({
  employeeId,
  justification,
}: CreatePointParams): Promise<Point> {
  const employeeExists = await employeeRepository.findById(employeeId);
  if (!employeeExists) throw notFoundError();

  const date = dayjs().format("YYYY-MM-DD");

  const existingPoints = await pointRepository.findByEmployeeIdAndDate(
    employeeId,
    date
  );

  const entryTime = dayjs().format("HH:mm:ss");

  console.log(date);
  if (existingPoints.length > 0) throw duplicatePointError();

  return pointRepository.createPoint(employeeId, {
    date: date,
    status: "PENDING",
    entryTime: entryTime,
    exitTime: null,
    justification: justification || null,
    Employee: { connect: { id: employeeId } },
  });
}

export async function getAllPoints(employeeId: number) {
  return pointRepository.getAllPoints(employeeId);
}

export function getPointByEmployeeId(userId: number, employeeId: number) {
  if (!employeeRepository.hasPermission(userId)) throw permissionError();
  return pointRepository.findByEmployeeId(employeeId);
}

export function getPointsByEmployeeIdAndStatus(
  employeeId: number,
  status: string
) {
  return pointRepository.findByEmployeeIdAndStatus(employeeId, status);
}

export function endPoint(employeeId: number, pointId: number) {
  const exitTime = dayjs().format("HH:mm:ss");

  return pointRepository.updatePoint(employeeId, pointId, {
    exitTime: exitTime,
    status: "FINISHED",
  });
}

export function justifyPoint(
  employeeId: number,
  pointId: number,
  justification: string
) {
  return pointRepository.updatePoint(employeeId, pointId, {
    justification,
    status: "PENDING APPROVAL",
  });
}

export function getPointById(pointId: number) {
  return pointRepository.findPointById(pointId);
}

export function approvePoint(employeeId: number, pointId: number) {
  if (!employeeRepository.hasPermission(employeeId)) throw permissionError();

  return pointRepository.approvePoint(pointId, {
    status: "APPROVED",
  });
}

export function getAllPointsByManager(managerId: number) {
  if (!employeeRepository.hasPermission(managerId)) throw permissionError();
  return pointRepository.getAllPointsByManager(managerId);
}

export type CreatePointParams = Pick<
  Point,
  "employeeId" | "date" | "status" | "entryTime" | "exitTime" | "justification"
>;

export const pointService = {
  createPoint,
  getAllPoints,
  getPointById,
  getPointByEmployeeId,
  getPointsByEmployeeIdAndStatus,
  endPoint,
  justifyPoint,
  approvePoint,
  getAllPointsByManager,
};
