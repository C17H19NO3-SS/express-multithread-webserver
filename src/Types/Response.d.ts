export interface Response {
  headers: IncomingMessage.headers;
  cookies: Record<string, string>;
  body: Record<string, any> | string | null | undefined;
}
