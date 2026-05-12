// Shared types and constants for Algebra Learning Tool

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface HelloResponse {
  message: string;
}
