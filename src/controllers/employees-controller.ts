import { Request, Response } from "express";
import httpStatus from "http-status";
import { employeeService } from "@/services";

export async function employeesPost(req: Request, res: Response) {
  const { email, password, roleId, departmentId, status } = req.body;

  const employee = await employeeService.createEmployee({
    email,
    password,
    roleId,
    departmentId,
    status,
  });

  return res.status(httpStatus.CREATED).json({
    id: employee.id,
    email: employee.email,
    roleId: employee.roleId,
    departmentId: employee.departmentId,
    status: employee.status,
  });
}
