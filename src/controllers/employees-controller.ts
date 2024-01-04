import { Request, Response } from "express";
import httpStatus from "http-status";
import { employeeService } from "@/services";

export async function employeesPost(req: Request, res: Response) {
  const { email, password, role, status } = req.body;

  const employee = await employeeService.createEmployee({
    email,
    password,
    role,
    status,
  });

  return res.status(httpStatus.CREATED).json({
    id: employee.id,
    email: employee.email,
    role: employee.role,
    status: employee.status,
  });
}
