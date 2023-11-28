import { Employee } from "@prisma/client";
import bcrypt from "bcrypt";
import { duplicatedEmailError } from "@/errors";
import { employeeRepository } from "@/repositories";

export async function createEmployee({
  email,
  password,
  roleId,
  departmentId,
  status,
}: CreateEmployeeParams): Promise<Employee> {
  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return employeeRepository.create({
    email,
    password: hashedPassword,
    status: status || "ACTIVE",
    roleId: roleId,
    departmentId: roleId,
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await employeeRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

export type CreateEmployeeParams = Pick<
  Employee,
  "email" | "password" | "roleId" | "departmentId" | "status"
>;

export const employeeService = {
  createEmployee,
};
