import type { Request, Response } from "express";
import type { Request as WorkerRequest } from "./Types/Request";
import type { Response as WorkerResponse } from "./Types/Response";
import type EventEmitter from "events";
import type { Config } from "./config/config";

interface Thread {
  worker: Worker;
  requests: number;
  id: number;
}

const threads = new Map<number, Thread>();

export const initServer = (eventEmitter: EventEmitter, threadCount: number) => {
  const config: Config = require("./config/config") as Config;
  for (var i = 1; i <= threadCount; i++) {
    threads.set(i, {
      worker: new Worker("src/worker/worker.ts"),
      requests: 0,
      id: i,
    });
  }

  (async () => {
    setInterval(() => {
      console.clear();
      console.table(
        threads
          .values()
          .toArray()
          .map((th) => {
            return {
              id: th.id,
              requests: th.requests,
            };
          })
      );
    }, 1000);
  })();

  eventEmitter.on("request", (req: Request, res: Response) => {
    try {
      const thread = threads
        .values()
        .toArray()
        .sort((thread1: Thread, thread2: Thread) => {
          return thread1.requests - thread2.requests;
        })[0];

      thread.requests++;

      if (thread.requests >= config.application.maxRequestPerThread) {
        res.end("Şuanda isteğiniz işleme alınamıyor.");
      }

      thread.worker.onmessage = (event: MessageEvent<string>) => {
        const response = JSON.parse(event.data) as WorkerResponse;
        for (const [key, value] of Object.entries(response.cookies)) {
          res.cookie(key, value);
        }
        res.header(response.headers).send(response.body);
        thread.requests--;
      };

      thread.worker.postMessage(
        JSON.stringify({
          body: req.body,
          cookies: req.cookies,
          headers: req.headers,
          path: req.path,
        } as WorkerRequest)
      );
    } catch (e) {
      console.error(e);
      console.log(threads);
    }
  });
};
