const path = require("path");
const { existsSync } = require("fs-extra");

/**
 * @typedef {Object} PluginOptions
 * @property {string[]} extensions
 * @property {string[]} layoutExtensions
 * @property {string} layoutsPath
 * @property {import("xdm/lib/compile").CoreProcessorOptions} xdmOptions
 */

/**
 * @type {(pluginOptions) => (nextConfig: {}) => {}}
 */
const plugin = (pluginOptions) => {
  const rootPath = path.resolve(process.cwd());
  const doesSrcExist = existsSync(path.join(rootPath, "src"));
  pluginOptions.layoutsPath = pluginOptions.layoutsPath ?? "layouts";
  pluginOptions.layoutExtensions = pluginOptions.layoutExtensions ?? [
    "js",
    "jsx",
  ];

  const layoutAbsPath = doesSrcExist
    ? path.join(rootPath, "src", pluginOptions.layoutsPath)
    : path.join(process.cwd(), pluginOptions.layoutsPath);

  if (!existsSync(layoutAbsPath)) {
    throw new Error(
      `The layouts directory '${pluginOptions.layoutsPath}' does not exist.`
    );
  }

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
            loader: "xdm/webpack.cjs",
            options: pluginOptions.xdmOptions ?? {},
          },
          {
            loader: path.join(__dirname, "loader.js"),
            options: {
              layoutsPath: layoutAbsPath,
            },
          },
        ],
      });

      if (nextConfig.webpack === "function")
        config = nextConfig.webpack(config, options);

      return config;
    },
  });
};

module.exports = plugin;
