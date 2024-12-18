export type QueueOptions = {
  queue?: any[];
  autoRun?: boolean;
  queueControlInterval?: number;
  log?: boolean;
};

export class QueueManager<T = any> {
  private queue: T[] = [];
  private events = new Map<string, Function>();
  private readonly allowedEvents: string[] = ["next", "end"];
  private readonly unPermittedEvents: string[] = ["inf", "push"];
  private isRunning: boolean = false;
  private queueControlInterval: number | Timer | undefined;
  private nextCallback: Function | undefined;

  private options: Required<QueueOptions> = {
    autoRun: false,
    queue: [],
    queueControlInterval: 500,
    log: true,
  };

  constructor(options: Partial<QueueOptions> = {}) {
    this.options = { ...this.options, ...options };
    this.queue = this.options.queue;
    if (this.options.autoRun) this.setupAutoRun();
  }

  private setupAutoRun(): void {
    this.events.set("push", () => {
      this.nextCallback != undefined &&
        clearTimeout(this.queueControlInterval as Timer);
      this.nextCallback != undefined && this.next(this.nextCallback);
    });

    this.events.set("inf", () => {
      if (this.queueControlInterval === undefined) {
        this.queueControlInterval = setTimeout(() => {
          if (!this.isRunning) {
            this.nextCallback != undefined && this.next(this.nextCallback);
          }
        }, this.options.queueControlInterval);
      }
    });
  }

  push(item: T): this {
    this.queue.push(item);
    if (this.options.autoRun) {
      this.emit("push", item);
    }
    return this;
  }

  next(callback: Function): this {
    this.nextCallback = callback;
    if (this.queue.length) {
      const item = this.queue.shift()!;
      this.emit("next", item);
      this.isRunning = true;
      this.nextCallback?.(item);
      this.isRunning = false;
      if (this.options.autoRun) {
        this.emit("end");
        this.next(this.nextCallback);
      }
    } else {
      this.emit("inf");
    }
    return this;
  }

  private emit(event: string, ...parameters: any[]): this {
    const callback = this.events.get(event);
    if (callback) {
      callback(...parameters);
    }
    if (this.options.log) {
      console.log(`Event emitted: ${event}`, ...parameters);
    }
    return this;
  }

  reset(): this {
    this.queue = [];
    return this;
  }

  on(event: string, callback: Function): this {
    if (this.allowedEvents.includes(event)) {
      this.events.set(event, callback);
    } else {
      console.warn(
        `Unsupported event: ${event}. Supported events are: ${this.allowedEvents.join(
          ", "
        )}`
      );
    }
    return this;
  }

  setNextCallback(callback: (item: T) => void): this {
    this.nextCallback = callback;
    return this;
  }
}
