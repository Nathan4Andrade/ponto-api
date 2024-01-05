import { Router } from "express";

import { createPointSchema, pointParamsSchema } from "@/schemas";
import { authenticateToken, validateBody, validateParams } from "@/middlewares";
import {
  pointsPost,
  pointsGet,
  pointsGetByEmployeeId,
  pointsGetByEmployeeIdAndStatus,
  endPoint,
  justifyPoint,
  approvePoint,
  pointGetById,
} from "@/controllers";

const pointsRouter = Router();

pointsRouter
  .all("/*", authenticateToken)
  .post("/", validateBody(createPointSchema), pointsPost)
  .get("/", pointsGet)
  .get("/:pointId", validateParams(pointParamsSchema), pointGetById)
  .get("/:employeeId", pointsGetByEmployeeId)
  .get("/:employeeId/:status", pointsGetByEmployeeIdAndStatus)
  .put("/:employeeId/:pointId/end", validateParams(pointParamsSchema), endPoint)
  .put(
    "/:employeeId/:pointId/justify",
    validateParams(pointParamsSchema),
    justifyPoint
  )
  .put(
    "/:employeeId/:pointId/approve",
    validateParams(pointParamsSchema),
    approvePoint
  );

export { pointsRouter };
