import type { Request } from "express";
import { sortThreads } from "../sorter/thread";
import type { ThreadStatus } from "./thread-status";

export class ThreadManager {
  private threads: Map<number, ThreadStatus> = new Map<number, ThreadStatus>();

  constructor(threads: Map<number, ThreadStatus>) {
    this.threads = threads;
  }

  sendRequest(req: Request) {
    const threadArray: ThreadStatus[] = Array.from(this.threads.values());
    const sorted = sortThreads(threadArray);

    sorted[0].workerObject.postMessage(JSON.stringify(req));
  }
}
