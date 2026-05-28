import { join, dirname } from "@std/path";
import { Database } from "@db/sqlite";
import {} from "./schemas.ts";
import { randomUUID } from "node:crypto";

const file = join(Deno.env.get("DATA_DIR") ?? "./data", "database.sqlite3");

export async function migrate() {
  await Deno.mkdir(dirname(file), { recursive: true });
  const output = await new Deno.Command(Deno.execPath(), {
    args: ["task", "migrate", "--url", `sqlite:${file}`, "up"],
  }).output();

  if (output.success) {
    console.log("Success");
  } else {
    const decoder = new TextDecoder();
    console.log(decoder.decode(output.stdout));
    console.error(decoder.decode(output.stderr));
  }
}

const db = new Database(file);
db.exec("pragma journal_mode = WAL");
