import type { Response } from "express";
import { requireUncached } from "../require.uncached";
import type { Config } from "../config/config";

export interface RenderOptions {
  res: Response;
  data: Record<string, any>;
  page: string;
}

export const Render = ({ data, page, res }: RenderOptions) => {
  res.render(page, {
    ...data,
    ...(requireUncached("./config/config.json") as Config)["web-server"]
      .pageContents[page],
  });
};
