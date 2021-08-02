const path = require("path");

const plugin = (pluginOptions) => {
  return (
    /** @type {import('next/dist/next-server/server/config-shared').NextConfig} */
    nextConfig
  ) => ({
    ...nextConfig,
    pageExtensions: Array.from(
      new Set([...(nextConfig.pageExtensions ?? []), "md", "mdx"])
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

module.exports = plugin;
