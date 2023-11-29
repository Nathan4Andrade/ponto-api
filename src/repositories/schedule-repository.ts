import { Prisma } from "@prisma/client";
import { prisma } from "@/config";

async function createSchedule(data: Prisma.ScheduleUncheckedCreateInput) {
  return prisma.schedule.create({ data });
}

async function getAllActiveSchedules() {
  return prisma.schedule.findMany({
    where: {
      status: "ACTIVE",
    },
  });
}

async function getSchedulesByTime(timeId: number) {
  return prisma.schedule.findFirst({
    where: {
      timeId,
    },
  });
}

export const scheduleRepository = {
  createSchedule,
  getAllActiveSchedules,
  getSchedulesByTime,
};
