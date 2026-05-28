import { expandGlob } from "@std/fs";
import { join } from "@std/path";
import esbuild from "esbuild";

export async function buildClient() {
  const dirname = import.meta.dirname ?? ".";
  const clientInputs = await Array.fromAsync(
    expandGlob("*.{ts,css}", {
      root: join(dirname, "client"),
    }),
  );
  const assetInputs = await Array.fromAsync(
    expandGlob("*", {
      root: join(dirname, "assets"),
    }),
  );

  await esbuild.build({
    entryPoints: [...clientInputs, ...assetInputs].map((f) => f.path),
    bundle: true,
    minify: true,
    loader: {
      ".ttf": "file",
      ".woff": "file",
      ".woff2": "file",
      ".svg": "copy",
    },
    outdir: join(dirname, "../dist"),
  });
}
