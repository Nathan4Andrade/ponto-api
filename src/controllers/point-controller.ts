import { Request, Response } from "express";
import httpStatus from "http-status";
import { pointService } from "@/services/points-service";

export async function pointsPost(req: Request, res: Response) {
  const { employeeId, date, status, entryTime, justification } = req.body;

  const point = await pointService.createPoint({
    employeeId,
    date,
    status,
    entryTime: entryTime ? new Date(`${date} ${entryTime}`) : null,
    exitTime: null,
    justification: justification || null,
  });

  return res.status(httpStatus.CREATED).json({
    id: point.id,
    employeeId: point.employeeId,
    date: point.date,
    status: point.status,
    entryTime: point.entryTime,
    exitTime: point.exitTime,
    justification: point.justification,
  });
}

export async function pointsGet(req: Request, res: Response) {
  const points = await pointService.getAllPoints();

  return res.status(httpStatus.OK).json(points);
}

export async function pointsGetByEmployeeId(req: Request, res: Response) {
  const { employeeId } = req.params;

  const points = await pointService.getPointByEmployeeId(Number(employeeId));

  return res.status(httpStatus.OK).json(points);
}

export async function pointsGetByEmployeeIdAndStatus(
  req: Request,
  res: Response
) {
  const { employeeId, status } = req.params;

  const points = await pointService.getPointsByEmployeeIdAndStatus(
    Number(employeeId),
    status
  );

  return res.status(httpStatus.OK).json(points);
}

export async function endPoint(req: Request, res: Response) {
  const { employeeId, pointId } = req.params;
  const { exitTime } = req.body;

  const point = await pointService.endPoint(
    Number(employeeId),
    Number(pointId),
    new Date(exitTime)
  );

  return res.status(httpStatus.OK).json(point);
}

export async function justifyPoint(req: Request, res: Response) {
  const { employeeId, pointId } = req.params;
  const { justification } = req.body;

  const point = await pointService.justifyPoint(
    Number(employeeId),
    Number(pointId),
    justification
  );

  return res.status(httpStatus.OK).json(point);
}

export async function approvePoint(req: Request, res: Response) {
  const { employeeId, pointId } = req.params;

  const point = await pointService.approvePoint(
    Number(employeeId),
    Number(pointId)
  );

  return res.status(httpStatus.OK).json(point);
}


