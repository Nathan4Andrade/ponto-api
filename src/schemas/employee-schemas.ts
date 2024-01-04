import Joi from "joi";
import { CreateEmployeeParams } from "@/services/employees-service";

export const createEmployeeSchema = Joi.object<CreateEmployeeParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});
