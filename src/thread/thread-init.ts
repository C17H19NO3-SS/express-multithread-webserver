import path from "path";
import type { ThreadStatus } from "./thread-status";

export const initThreads = (threadCount: number) => {
  const threads: ThreadStatus[] = [];
  for (var i = 1; i <= threadCount; i++) {
    const id: number = parseInt((Math.random() * 100000000).toFixed(0));
    const worker: Worker = new Worker(
      path.join("src", "thread", "server-thread.ts")
    );

    threads.push({
      id,
      totalRequest: 0,
      workerObject: worker,
    });
  }

  return threads;
};
