import EventEmitter from "events";
import type { WorkerRequest } from "../worker.d/worker-request";
import type { WorkerResponse } from "../worker.d/worker-response";

declare var thread: Worker;
const we = new EventEmitter();

thread.addEventListener("message", (e: MessageEvent<any>) => {
  const request: WorkerRequest = JSON.parse(e.data) as WorkerRequest;
  we.emit("request", request);
});

we.on("request", (request: WorkerRequest) => {
  console.log(request);
  if (request.path === "/") {
    thread.postMessage(
      JSON.stringify({
        id: request.id,
        body: "Deneme",
        cookie: {},
        headers: {
          "Content-Type": "text/html",
        },
      } as WorkerResponse)
    );
  }
});
