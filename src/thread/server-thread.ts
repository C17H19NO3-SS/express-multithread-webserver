import EventEmitter from "events";

declare var thread: Worker;
const we = new EventEmitter();

thread.addEventListener("message", (e: MessageEvent<any>) => {});
