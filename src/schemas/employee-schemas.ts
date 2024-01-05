import Joi from "joi";
import {
  CreateManagerParams,
  CreateSubordinateParams,
} from "@/services/employees-service";
import { employeeParam } from "@/repositories";

export const createManagerSchema = Joi.object<CreateManagerParams>({
  user: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export const createSubordinateSchema = Joi.object<CreateSubordinateParams>({
  user: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export const employeeParamsSchema = Joi.object<employeeParam>({
  employeeId: Joi.number().required(),
});
