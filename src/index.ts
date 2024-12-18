import express from "express";
import type { Config } from "./config/config";
import path from "path";
import chalk from "chalk";
import { requireUncached } from "./require.uncached";
import { Render } from "./render/renderer";
import { init } from "./init";

try {
  const config: Config = require("./config/config") as Config;
  const app = express();
  app.set("views", path.join("src", "views"));
  app.set("view engine", config["web-server"].viewEngine);
  init(config, app);

  config["web-server"].defaultRouters.forEach((v) => {
    app.get(v, (_, res) => {
      Render({
        res,
        data: (requireUncached("./config/config.json") as Config)["web-server"]
          .defaultPageCotnents,
        page: (v.endsWith("/") ? `${v}index.ejs` : v).slice(1),
      });
    });
  });

  app.use(express.static(path.join(__dirname, "public")));

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
