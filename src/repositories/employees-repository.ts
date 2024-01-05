import { Prisma } from "@prisma/client";
import { prisma } from "@/config";

async function findByUser(user: string, select?: Prisma.EmployeeSelect) {
  const params: Prisma.EmployeeFindUniqueArgs = {
    where: {
      user,
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

async function findById(id: number) {
  return prisma.employee.findUnique({
    where: {
      id,
    },
  });
}
async function hasPermission(employeeId: number) {
  const employee = await prisma.employee.findUnique({
    where: { id: employeeId },
  });

  return employee && employee.role === "MANAGER";
}

export const employeeRepository = {
  findByUser,
  create,
  findById,
  hasPermission,
};

export type employeeParam = { employeeId: number };
