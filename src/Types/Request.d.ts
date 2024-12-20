export interface Request {
  headers: IncomingMessage.headers;
  cookies: Record<string, string>;
  body: Record<string, any> | string | null | undefined;
  path: string;
}
