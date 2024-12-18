import type { Express, Request, Response } from "express";

export const allRequests: Map<
  number,
  {
    req: Request;
    res: Response;
  }
> = new Map<
  number,
  {
    req: Request;
    res: Response;
  }
>();

export const init = (app: Express) => {
  app.use((req, res) => {
    allRequests.set(parseInt((Math.random() * 100000000).toFixed(0)), {
      req,
      res,
    });
  });
};

/* REACT CONTROL COMPONENT */
// if (config["web-server"].react) {
//   app.use((_, res, next) => {
//     if (config["web-server"].exceptions.some((v: string) => v === _.path))
//       return next();
//     if (fs.existsSync(path.join(__dirname, "public", "index.html"))) {
//       res
//         .header("content-type", "text/html")
//         .send(
//           fs
//             .readFileSync(
//               path.join(__dirname, "src", "public", "index.html"),
//               "utf-8"
//             )
//             .toString()
//         );
//     } else next();
//   });
// }
