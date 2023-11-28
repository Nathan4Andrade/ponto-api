import { Router } from "express";

import { createEmployeeSchema } from "@/schemas";
import { validateBody } from "@/middlewares";
import { employeesPost } from "@/controllers";

const employeesRouter = Router();

employeesRouter.post("/", validateBody(createEmployeeSchema), employeesPost);

export { employeesRouter };
