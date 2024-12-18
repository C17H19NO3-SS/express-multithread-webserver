export interface Config {
  "web-server": {
    port: number;
    defaultRouters: string[];
    viewEngine: string;
    webServerStartedLog: string;
    pageContents: Record<string, Record<string, string>>;
    defaultPageCotnents: Record<string, string>;
    react: boolean;
    exceptions: string[];
  };
}
