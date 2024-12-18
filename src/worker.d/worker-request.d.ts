export interface WorkerRequest {
  id: number;
  headers: Record<string, any>;
  cookie: Record<string, string>;
  path: string;
  query: Record<string, string>;
  body: string;
}
