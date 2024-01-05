import { Request, Response } from "express";
import httpStatus from "http-status";
import { authenticationService, SignInParams } from "@/services";

export async function singInPost(req: Request, res: Response) {
  const { user, password } = req.body as SignInParams;

  const result = await authenticationService.signIn({ user, password });

  return res.status(httpStatus.OK).send(result);
}
