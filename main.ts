import { buildClient } from "./src/build.ts";
import { migrate } from "./src/db.ts";
import { startServer } from "./src/server.ts";

const port = Number(Deno.env.get("PORT") ?? 3000);

if (import.meta.main) {
  console.log("1. Building client");
  await buildClient();

  console.log("2. Migrating database");
  await migrate();

  console.log("3. Running server");
  startServer(port);
}
