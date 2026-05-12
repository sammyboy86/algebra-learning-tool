import { Router } from "express";

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

interface HelloResponse {
  message: string;
}

export const helloRouter = Router();

helloRouter.get("/hello", (_req, res) => {
  const response: ApiResponse<HelloResponse> = {
    success: true,
    data: { message: "Hello World!" },
  };
  res.json(response);
});
