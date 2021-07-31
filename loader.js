const matter = require("gray-matter");
const { getOptions } = require("loader-utils");

module.exports = async function layoutLoader(source) {
  const callback = this.async();
  const { resourcePath } = this;
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

  // callback(null, content);
  if (typeof data.layout === "string") {
    const jsx = `
        import Layout from "${options.layoutsPath}/${data.layout}"

        export const frontMatter = ${JSON.stringify(data)}

        <Layout frontMatter={frontMatter}>${content}</Layout>
      `;

    callback(null, jsx);
  } else {
    const jsx = `
        export const frontMatter = ${JSON.stringify(data)};

        ${content}
      `;

    callback(null, jsx);
  }
  return;

  // callback(
  //   new Error(`next-mdx-fused: Layout not found in ${resourcePath}`)
  // );
};
