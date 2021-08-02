import { SerializeOptions } from "next-mdx-remote/dist/types";

export type Options = SerializeOptions;

declare module "next-mdx-builder" {
  export default (options: Options) => (nextConfig: {}) => {};
}
