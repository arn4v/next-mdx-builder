import { SerializeOptions } from "next-mdx-remote/dist/types";

export type Options = SerializeOptions;

declare module "next-mdx-fused" {
  export default function nextMdxFused(
    options: Options
  ): (nextConfig: {}) => {};
}
