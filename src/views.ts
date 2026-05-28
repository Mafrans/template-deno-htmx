import { html } from "@hono/hono/html";
import type {} from "./schemas.ts";
import * as db from "./db.ts";
import { type MaybePromise } from "./utils.ts";
import type { HtmlEscapedString } from "@hono/hono/utils/html";

export const cx = (...classes: (string | boolean)[]) =>
  classes.filter((c) => typeof c === "string").join(" ");

type Html = MaybePromise<HtmlEscapedString>;

export const mainLayout = (content: Html) => html`
    <!DOCTYPE html>
    <html lang="en" hx-ext="sse">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Dashboard</title>
        <link rel="stylesheet" href="/dist/index.css"></link>
      </head>
      <body>
        ${content}
        <script src="/dist/index.js"></script>
      </body>
    </html>
  `;

export const indexPage = () =>
  mainLayout(html`<main class="index-view"></main>`);
