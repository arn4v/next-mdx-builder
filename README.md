# next-mdx-builder

Next.js plugin that adds MDX pages support via next-mdx-remote & a custom Webpack plugin.

## Install

```shell
yarn add next-mdx-builder
```

```shell
npm i --save next-mdx-builder
```

## API Reference

```ts
type PluginOptions = {
  mdxOptions: {
    remarkPlugins: Array<unknown>;
    rehypePlugins: Array<unknown>;
  };
};
```

## Usage

#### Plugin

Add and configure plugin in `next.config.js`:

```js
// next.config.js
const withMdxBuilder = require("next-mdx-builder")({
  mdxOptions: {
    remarkPlugins: [require("remark-gfm")],
    rehypePlugins: [require("mdx-prism")],
  },
});

module.exports = withMdxBuilder(/** Next Config */ {});
```

#### pages

**Directory tree:**

```
- layouts/
    - docs.jsx
- pages/
    - docs/
        - introduction.mdx
```

**MDX (pages/docs/introduction.mdx):**

```markdown
---
title: Introduction
layout: "../../layouts/docs"
---

# Docs Introduction Page
```

**Layout:**

```jsx
export default function DocsPage({ children, frontMatter }) {
  return (
    <>
      <h1>{frontMatter.title}</h1>
      {children}
    </>
  );
}
```

## Acknowledgements

- Modeled after [hashicorp/next-mdx-enhanced](https://github.com/hashicorp/next-mdx-enhanced) and [shuding/nextra](https://github.com/shuding/nextra)
