import { Hono } from "@hono/hono";
import { serveStatic } from "@hono/hono/deno";
import * as db from "./db.ts";
import * as schemas from "./schemas.ts";
import * as views from "./views.ts";

const hono = new Hono();

hono.use("/dist/*", serveStatic({ root: Deno.cwd() }));

hono.get("/", (c) => c.html(views.indexPage()));
hono.get("/empty", (c) => c.newResponse(null));

export function startServer(port: number) {
  Deno.serve({ port }, hono.fetch);
}
