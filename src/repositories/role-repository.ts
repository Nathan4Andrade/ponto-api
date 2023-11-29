import { Prisma } from "@prisma/client";
import { prisma } from "@/config";

async function createRole(data: Prisma.RoleUncheckedCreateInput) {
  return prisma.role.create({
    data,
  });
}

async function getAllRoles() {
  return prisma.role.findMany();
}

async function getRoleById(id: number) {
  return prisma.role.findUnique({ where: { id } });
}

async function updateRole(id: number, data: Prisma.RoleUncheckedUpdateInput) {
  return prisma.role.update({ where: { id }, data });
}

async function deleteRole(id: number) {
  return prisma.role.delete({ where: { id } });
}

async function findEmployeesByRole(roleId: number) {
  return prisma.role.findFirst({
    where: {
      id: roleId,
    },
    include: {
      Employees: true,
    },
  });
}

async function getRolesByDepartment(departmentId: number) {
  return prisma.role.findMany({
    where: {
      departmentId,
    },
  });
}

async function findRoleByDepartmentAndName(departmentId: number, name: string) {
  return prisma.role.findFirst({
    where: {
      departmentId,
      name,
    },
  });
}

async function findRoleByDepartmentAndActive(departmentId: number) {
  return prisma.role.findFirst({
    where: {
      departmentId,
      status: "ACTIVE",
    },
  });
}

export const roleRepository = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
  findEmployeesByRole,
  getRolesByDepartment,
  findRoleByDepartmentAndName,
  findRoleByDepartmentAndActive,
};
