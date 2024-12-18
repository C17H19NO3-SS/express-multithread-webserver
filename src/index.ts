import express, { type Request, type Response } from "express";
import type { Config } from "./config/config";
import path from "path";
import chalk from "chalk";
import { init, allRequests } from "./init";
import { QueueManager } from "./q-manager/QManager";
import { initThreads } from "./thread/thread-init";
import { ThreadManager } from "./thread/thread-manager";

try {
  const config: Config = require("./config/config") as Config;
  const app = express();
  const threads = initThreads(config.application.totalThreads);
  const tm = new ThreadManager(threads);
  const qm: QueueManager = new QueueManager({
    autoRun: true,
    log: true,
    queue: Array.from(allRequests.entries()),
    queueControlInterval: 1000,
  });

  qm.setNextCallback(
    ([id, { req, res }]: [number, { req: Request; res: Response }]) => {}
  );

  app.set("views", path.join("src", "views"));
  app.set("view engine", config["web-server"].viewEngine);
  init(app);

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
