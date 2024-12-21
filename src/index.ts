import express from "express";
import type { Config } from "./config/config";
import path from "path";
import chalk from "chalk";
import { initServer } from "./init.server.ts";
import { EventEmitter } from "events";
import moment from "moment";
import fs from "fs";

try {
  const config: Config = require("./config/config") as Config;
  const app = express();
  const emitter = new EventEmitter();

  app.set("views", path.join("src", "views"));
  app.set("view engine", config["web-server"].viewEngine);
  initServer(emitter, config.application.totalThreads);
  app.use((req, res, next) => {
    if (req.path.split(".").length > 1 && !req.path.endsWith("/")) next();
    else emitter.emit("request", req, res);
  });
  app.use(express.static(path.join("src", "public")));

  app.listen(config["web-server"].port, () => {
    console.log(
      chalk.green(
        config["web-server"].webServerStartedLog.replace(
          "$PORT",
          config["web-server"].port.toString()
        )
      )
    );
  });
} catch (e) {
  console.error(e);
}

process.on("uncaughtException", (e) => {
  try {
    const id = Math.random() * 10000000;
    var date = moment().format(`YYYY-MM-DD`);
    fs.writeFileSync(
      path.join("logs", "errors", `${date}_${id}`),
      e as unknown as string
    );
  } catch (e) {
    console.error(e);
  }
});
