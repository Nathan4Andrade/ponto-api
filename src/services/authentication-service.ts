import { Employee } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { invalidCredentialsError } from "@/errors";
import { authenticationRepository, employeeRepository } from "@/repositories";
import { exclude } from "@/utils/prisma-utils";

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { user, password } = params;

  const employee = await getUserOrFail(user);

  await validatePasswordOrFail(password, employee.password);

  const token = await createSession(employee.id);

  return {
    user: exclude(employee, "password"),
    token,
  };
}

async function getUserOrFail(user: string): Promise<GetUserOrFailResult> {
  const employee = await employeeRepository.findByUser(user, {
    id: true,
    user: true,
    password: true,
  });
  if (!employee) throw invalidCredentialsError();

  return employee;
}

async function createSession(employeeId: number) {
  const token = jwt.sign({ employeeId }, process.env.JWT_SECRET);
  await authenticationRepository.createSession({
    token,
    employeeId,
  });

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

export type SignInParams = Pick<Employee, "user" | "password">;

type SignInResult = {
  user: Pick<Employee, "id" | "user">;
  token: string;
};

type GetUserOrFailResult = Pick<Employee, "id" | "user" | "password">;

export const authenticationService = {
  signIn,
};
