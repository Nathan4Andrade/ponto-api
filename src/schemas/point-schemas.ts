import Joi from "joi";
import { CreatePointParams } from "@/services";
import { PointParam } from "@/repositories";

export const createPointSchema = Joi.object<CreatePointParams>({
  employeeId: Joi.number().required(),
  status: Joi.string().required(),
  justification: Joi.string().optional(),
});

export const pointParamsSchema = Joi.object<PointParam>({
  pointId: Joi.number().required(),
});
