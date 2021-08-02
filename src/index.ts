import path from "path";
import { SerializeOptions } from "next-mdx-remote/dist/types";

type Options = SerializeOptions;
type NextConfig = Record<any, any>;

const plugin = (pluginOptions: Options) => {
  return (nextConfig: NextConfig): NextConfig => ({
    ...nextConfig,
    pageExtensions: Array.from(
      new Set([...(nextConfig.pageExtensions ?? []), "js", "jsx", "md", "mdx"])
    ),
    webpack(config, options) {
      config.module.rules.push({
        test: /\.(md|mdx)$/,
        use: [
          options.defaultLoaders.babel,
          {
            loader: path.join(__dirname, "loader.js"),
            options: {
              ...pluginOptions,
            },
          },
        ],
      });

      if (typeof nextConfig.webpack === "function")
        config = nextConfig.webpack(config, options);

      return config;
    },
  });
};

export default plugin;
