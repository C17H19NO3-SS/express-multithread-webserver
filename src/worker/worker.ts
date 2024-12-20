import type { Request } from "../Types/Request";
import type { Response } from "../Types/Response";
import ejs from "ejs";
import path from "path";
import fs from "fs";

declare const self: Worker;

self.onmessage = async (event: MessageEvent<string>) => {
  try {
    const req: Request = JSON.parse(event.data);
    const response = await handleRequest(req);
    self.postMessage(JSON.stringify(response)); // Send successful response
  } catch (e) {
    // Catch ALL errors within the worker
    console.error("Worker error:", e);
    const errorResponse: Response = {
      body: await ejs.renderFile(path.join("src", "error-pages", "500.ejs"), {
        error: e, // Pass the error for display
      }),
      cookies: {},
      headers: { "Content-Type": "text/html" }, // Set content type for HTML error
    };
    self.postMessage(JSON.stringify(errorResponse)); // Send error response
  }
};

const handleRequest = async (req: Request): Promise<Response> => {
  try {
    // ... (existing code to generate response) ...
    return {
      body: await ejs.render(
        fs
          .readFileSync(
            path.join(
              "src",
              "views",
              req.path.endsWith("/")
                ? `${req.path}/index.ejs`
                : req.path + ".ejs"
            )
          )
          .toString(),
        {
          title: "test",
        }
      ),
      cookies: {},
      headers: {},
    };
  } catch (error) {
    // Log for debugging
    console.error("Error handling request:", error);

    //Re-throw error to be caught by outer try/catch
    throw error;
  }
};
