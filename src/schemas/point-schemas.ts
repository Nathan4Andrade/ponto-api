import Joi from "joi";
import { CreatePointParams } from "@/services";

export const createPointSchema = Joi.object<CreatePointParams>({
  employeeId: Joi.number().required(),
  date: Joi.date().required(),
  status: Joi.string().required(),
  entryTime: Joi.date().required(),
  justification: Joi.string().optional(),
});

// Compare this snippet from src/schemas/index.ts:
// import { createEmployeeSchema } from "./employee-schemas";
