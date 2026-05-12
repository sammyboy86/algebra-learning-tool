import { Router } from "express";
import type { ApiResponse, HelloResponse } from "shared";

export const helloRouter = Router();

helloRouter.get("/hello", (_req, res) => {
  const response: ApiResponse<HelloResponse> = {
    success: true,
    data: { message: "Hello World!" },
  };
  res.json(response);
});
