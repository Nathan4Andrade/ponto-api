import { Request, Response } from "express";
import httpStatus from "http-status";
import { pointService } from "@/services/points-service";
import { AuthenticatedRequest } from "@/middlewares";

export async function pointsPost(req: AuthenticatedRequest, res: Response) {
  const { employeeId } = req;
  const point = await pointService.createPoint({
    employeeId,
    ...req.body,
  });

  return res.status(httpStatus.CREATED).json(point);
}

export async function pointsGet(req: AuthenticatedRequest, res: Response) {
  const { employeeId } = req;
  const points = await pointService.getAllPoints(employeeId);

  return res.status(httpStatus.OK).json(points);
}

export async function pointsGetByEmployeeId(
  req: AuthenticatedRequest,
  res: Response
) {
  const { employeeToGetId } = req.params;
  const { employeeId } = req;

  const points = await pointService.getPointByEmployeeId(
    employeeId,
    Number(employeeToGetId)
  );

  return res.status(httpStatus.OK).json(points);
}

export async function pointsGetByEmployeeIdAndStatus(
  req: AuthenticatedRequest,
  res: Response
) {
  const { employeeId, status } = req.params;

  const points = await pointService.getPointsByEmployeeIdAndStatus(
    Number(employeeId),
    status
  );

  return res.status(httpStatus.OK).json(points);
}

export async function pointGetById(req: AuthenticatedRequest, res: Response) {
  const { pointId } = req.params;

  const point = await pointService.getPointById(Number(pointId));

  return res.status(httpStatus.OK).json(point);
}

export async function endPoint(req: AuthenticatedRequest, res: Response) {
  const { pointId } = req.params;
  const { employeeId } = req;

  const point = await pointService.endPoint(
    Number(employeeId),
    Number(pointId)
  );

  return res.status(httpStatus.OK).json(point);
}

export async function justifyPoint(req: AuthenticatedRequest, res: Response) {
  const { pointId } = req.params;
  const { justification } = req.body;
  const { employeeId } = req;

  const point = await pointService.justifyPoint(
    employeeId,
    Number(pointId),
    justification
  );

  return res.status(httpStatus.OK).json(point);
}

export async function approvePoint(req: AuthenticatedRequest, res: Response) {
  const { pointId } = req.params;
  const { employeeId } = req;

  const point = await pointService.approvePoint(employeeId, Number(pointId));

  return res.status(httpStatus.OK).json(point);
}

export async function getAllPointsByManager(
  req: AuthenticatedRequest,
  res: Response
) {
  const { employeeId } = req;

  const points = await pointService.getAllPointsByManager(employeeId);

  return res.status(httpStatus.OK).json(points);
}
