import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { paymentError, unauthorizedError } from "@/errors";
import { authenticationRepository, employeeRepository } from "@/repositories";

export async function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.header("Authorization");
  if (!authHeader) throw unauthorizedError();

  const token = authHeader.split(" ")[1];
  if (!token) throw unauthorizedError();

  const { employeeId } = jwt.verify(
    token,
    process.env.JWT_SECRET
  ) as JWTPayload;

  const session = await authenticationRepository.findSession(token);
  if (!session) throw unauthorizedError();

  const employee = await employeeRepository.findById(employeeId);
  if (employee.paymentStatus === false) throw paymentError();

  req.employeeId = employeeId;
  console.log("employeeId", employeeId);
  next();
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  employeeId: number;
};
