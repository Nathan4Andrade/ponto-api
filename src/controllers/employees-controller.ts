import { Request, Response } from "express";
import httpStatus from "http-status";
import { employeeService } from "@/services";
import { AuthenticatedRequest } from "@/middlewares";
import { employeeRepository } from "@/repositories";
import { notFoundError, unauthorizedError } from "@/errors";

export async function managerPost(req: Request, res: Response) {
  const { user, name, password, role, status } = req.body;

  const employee = await employeeService.createManager({
    user,
    name,
    password,
  });

  return res.status(httpStatus.CREATED).json({
    id: employee.id,
    user: employee.user,
    name: employee.name,
  });
}

export async function subordinatePost(
  req: AuthenticatedRequest,
  res: Response
) {
  const { user, name, password } = req.body;
  const { employeeId } = req;

  const employee = await employeeService.createSubordinate({
    user,
    name,
    password,
    managerId: employeeId,
  });

  return res.status(httpStatus.CREATED).json({
    id: employee.id,
    user: employee.user,
    name: employee.name,
    managerId: employee.managerId,
  });
}
