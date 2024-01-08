import Joi from "joi";
import { CreatePointParams } from "@/services";
import { PointParam } from "@/repositories";

export const createPointSchema = Joi.object<CreatePointParams>({
  justification: Joi.string().optional(),
});

export const justifyPointSchema = Joi.object<CreatePointParams>({
  justification: Joi.string().required(),
});

export const pointParamsSchema = Joi.object<PointParam>({
  pointId: Joi.number().required(),
});
