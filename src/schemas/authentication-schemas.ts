import Joi from "joi";
import { SignInParams } from "@/services";

export const signInSchema = Joi.object<SignInParams>({
  user: Joi.string().required(),
  password: Joi.string().required(),
});
