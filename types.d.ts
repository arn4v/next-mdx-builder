import type { CoreProcessorOptions } from "xdm/lib/compile";

export type Options = {
  extensions: string[];
  layoutExtensions: string[];
  layoutsPath: string;
  xdmOptions: CoreProcessorOptions;
};

declare module "next-mdx-fused" {
  export default function nextMdxFused(
    options: Options
  ): (nextConfig: {}) => {};
}
