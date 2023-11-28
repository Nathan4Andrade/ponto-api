import { Prisma } from "@prisma/client";
import { prisma } from "@/config";

async function findByEmail(email: string, select?: Prisma.EmployeeSelect) {
  const params: Prisma.EmployeeFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.employee.findUnique(params);
}

async function create(data: Prisma.EmployeeUncheckedCreateInput) {
  return prisma.employee.create({
    data,
  });
}

export const employeeRepository = {
  findByEmail,
  create,
};
