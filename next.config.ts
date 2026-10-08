import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Keep Next rooted on this app so parent lockfiles cannot divert the build output.
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
