import { Employee } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { invalidCredentialsError } from "@/errors";
import { authenticationRepository, employeeRepository } from "@/repositories";
import { exclude } from "@/utils/prisma-utils";

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  return {
    user: exclude(user, "password"),
    token,
  };
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const employee = await employeeRepository.findByEmail(email, {
    id: true,
    email: true,
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

export type SignInParams = Pick<Employee, "email" | "password">;

type SignInResult = {
  user: Pick<Employee, "id" | "email">;
  token: string;
};

type GetUserOrFailResult = Pick<Employee, "id" | "email" | "password">;

export const authenticationService = {
  signIn,
};
