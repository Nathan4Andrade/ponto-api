import { Router } from "express";

import { createPointSchema } from "@/schemas";
import { validateBody } from "@/middlewares";
import {
  pointsPost,
  pointsGet,
  pointsGetByEmployeeId,
  pointsGetByEmployeeIdAndStatus,
  endPoint,
  justifyPoint,
  approvePoint,
} from "@/controllers";

const pointsRouter = Router();

pointsRouter.post("/", validateBody(createPointSchema), pointsPost);
pointsRouter.get("/", pointsGet);
pointsRouter.get("/:employeeId", pointsGetByEmployeeId);
pointsRouter.get("/:employeeId/:status", pointsGetByEmployeeIdAndStatus);
pointsRouter.put("/:employeeId/:pointId/end", endPoint);
pointsRouter.put("/:employeeId/:pointId/justify", justifyPoint);
pointsRouter.put("/:employeeId/:pointId/approve", approvePoint);

export { pointsRouter };
