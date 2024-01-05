import { Employee } from "@prisma/client";
import bcrypt from "bcrypt";
import { duplicatedUserError } from "@/errors";
import { employeeRepository } from "@/repositories";

async function createManager({
  user,
  name,
  password,
}: CreateManagerParams): Promise<Employee> {
  await validateUniqueUserOrFail(user);

  const hashedPassword = await bcrypt.hash(password, 12);
  return employeeRepository.create({
    user,
    name,
    password: hashedPassword,
    status: "ACTIVE",
    role: "MANAGER",
  });
}

async function createSubordinate({
  user,
  name,
  password,
  managerId,
}: CreateSubordinateParams): Promise<Employee> {
  await validateUniqueUserOrFail(user);

  const hashedPassword = await bcrypt.hash(password, 12);
  return employeeRepository.create({
    user,
    name,
    password: hashedPassword,
    status: "ACTIVE",
    role: "SUBORDINATE",
    managerId,
  });
}

async function validateUniqueUserOrFail(user: string) {
  const duplicateUser = await employeeRepository.findByUser(user);
  if (duplicateUser) {
    throw duplicatedUserError();
  }
}

export type CreateManagerParams = Pick<
  Employee,
  "user" | "name" | "password" 
>;

export type CreateSubordinateParams = Pick<
  Employee,
  "user" | "name" | "password" | "managerId"
>;

export const employeeService = {
  createManager,
  createSubordinate,
};
