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

  const mdxSource = await serialize(content, options ?? {});

  if (typeof data.layout === "string") {
    return callback(
      null,
      `
      import { MDXRemote } from "next-mdx-remote";
      import Layout from "${data.layout}";
      export const frontMatter = ${JSON.stringify(data)}

      export default function Page() {
        return (
          <Layout frontMatter={frontMatter}>
            <MDXRemote {...${JSON.stringify(mdxSource)}} />
          </Layout>
        );
      }
    `
    );
  }

  return callback(
    null,
    `
      import { MDXRemote } from "next-mdx-remote";

      export const frontMatter = ${JSON.stringify(data)}

      export default function Page() {
        return <MDXRemote {...${JSON.stringify(mdxSource)}} />
      }
    `
  );
};
