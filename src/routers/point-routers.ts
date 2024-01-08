import { Router } from "express";

import {
  createPointSchema,
  justifyPointSchema,
  pointParamsSchema,
} from "@/schemas";
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
  getAllPointsByManager,
} from "@/controllers";

const pointsRouter = Router();

pointsRouter
  .all("/*", authenticateToken)
  .post("/", validateBody(createPointSchema), pointsPost)
  .get("/", pointsGet)
  .get("/:pointId", validateParams(pointParamsSchema), pointGetById)
  .get("/manager/allPoints", getAllPointsByManager)
  .get("/manager/:employeeToGetId", pointsGetByEmployeeId)
  .get("/manager/:employeeId/:status", pointsGetByEmployeeIdAndStatus)
  .put("/:pointId/end", validateParams(pointParamsSchema), endPoint)
  .put(
    "/:pointId/justify",
    validateParams(pointParamsSchema),
    validateBody(justifyPointSchema),
    justifyPoint
  )
  .put(
    "/manager/:pointId/approve",
    validateParams(pointParamsSchema),
    approvePoint
  );

export { pointsRouter };
