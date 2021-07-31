export type Options = {
  mdxOptions?: {
    remarkPlugins: unknown[];
    rehypePlugins: unknown[];
  };
};

declare module "next-mdx-fused" {
  export default function nextMdxFused(
    options: Options
  ): (nextConfig: {}) => {};
}
