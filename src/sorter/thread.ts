import type { ThreadStatus } from "../thread/thread-status";

export const sortThreads = (threads: ThreadStatus[]) => {
  threads.sort((a, b) => a.totalRequest - b.totalRequest);
  return threads;
};
