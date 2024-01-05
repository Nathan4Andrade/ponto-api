import { Router } from "express";

import { createManagerSchema, createSubordinateSchema } from "@/schemas";
import { authenticateToken, validateBody, validateParams } from "@/middlewares";
import { managerPost, subordinatePost } from "@/controllers";

const employeesRouter = Router();

employeesRouter
  .all("/*", authenticateToken)
  .post("/manager", validateBody(createManagerSchema), managerPost)
  .post("/subordinate", validateBody(createSubordinateSchema), subordinatePost);

export { employeesRouter };
