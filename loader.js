const matter = require("gray-matter");
const { getOptions } = require("loader-utils");
const { serialize } = require("next-mdx-remote/serialize");

module.exports = async function layoutLoader(source) {
  const callback = this.async();
  const options = getOptions(this);

  let data;
  let content;

  try {
    const res = matter(source);
    data = res.data;
    content = res.content;
  } catch (err) {
    callback(err);
  }

  let mdxSource;

  try {
    mdxSource = await serialize(content, options ?? {});
  } catch (err) {
    callback(err);
  }

  const hasLayout = typeof data.layout === "string";

  return callback(
    null,
    `
      import { MDXRemote } from "next-mdx-remote";
      ${hasLayout ? `import Layout from "${data.layout}";` : ""}

      export const frontMatter = ${JSON.stringify(data)}

      export default function Page() {
        return (
          ${hasLayout ? "<Layout frontMatter={frontMatter}>" : ""}
            <MDXRemote {...${JSON.stringify(mdxSource)}} />
          ${hasLayout ? "</Layout>" : ""}
        );
      }
    `.trim()
  );
};
