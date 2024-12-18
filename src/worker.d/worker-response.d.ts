export interface WorkerResponse {
  id: number;
  headers: Record<string, any>;
  cookie: Record<string, string>;
  body: string;
}
