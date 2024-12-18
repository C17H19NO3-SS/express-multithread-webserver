import type { Config } from "./config/config";
import type { Express } from "express";
import path from "path";
import fs from "fs";

export const init = (config: Config, app: Express) => {
  if (config["web-server"].react) {
    app.use((_, res, next) => {
      if (config["web-server"].exceptions.some((v: string) => v === _.path))
        return next();
      if (fs.existsSync(path.join(__dirname, "public", "index.html"))) {
        res
          .header("content-type", "text/html")
          .send(
            fs
              .readFileSync(
                path.join(__dirname, "src", "public", "index.html"),
                "utf-8"
              )
              .toString()
          );
      } else next();
    });
  }
};
