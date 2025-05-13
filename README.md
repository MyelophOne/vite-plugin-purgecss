# @myelophone/vite-plugin-purgecss

[Vite](https://vitejs.dev/) plugin for removing unused CSS from generated bundles using [PurgeCSS](https://purgecss.com/).

As @mojojoejo/vite-plugin-purgecss has been depreceated.

This plugin is with actual updated dependencies. Can be used with Nuxt3.

## 📦 Install

**Add as a devDependency**:

```sh
{
 "devDependencies": {
  "@myelophone/vite-plugin-purgecss": "https://github.com/myelophone/vite-plugin-purgecss.git",
 }
}
```

**And run install**:

```sh
yarn install
```

## 🚀 Usage

### Basic

Omitting the options argument will use the default PurgeCSS options to clean
the CSS output of the Vite build.

```ts
// vite.config.ts
import pluginPurgeCss from "@myelophone/vite-plugin-purgecss";

export default {
  plugins: [
    pluginPurgeCss(),
  ],
};

```

### Lazy

Load plugin using async await (so, that it could be used as devDependencies).

```ts
// vite.config.ts

const defaultPlugins = []

export default defineConfig(async ({ command, mode, isSsrBuild, isPreview }) => {
  if (command === 'build') {
    const { default: pluginPurgeCss } = await import('@myelophone/vite-plugin-purgecss')
    defaultPlugins.push(pluginPurgeCss())
  }
 return {
  plugins: defaultPlugins,
 }
}

```

### With CSS Variables

To remove unused CSS variable declarations and invalid `var()` functions,
enable the `variables` PurgeCSS option.

```ts
// vite.config.ts
import pluginPurgeCss from "@myelophone/vite-plugin-purgecss";

export default {
  plugins: [
    pluginPurgeCss({
      variables: true,
    }),
  ],
};

```

### With external files

To recognize class names defined in external JavaScript/TypeScript files, or
any other asset file, use the `content` option to include extracted values.

An array of CSS file names or raw values can be passed with the `css` option to
add CSS content to the output of PurgeCSS.

```ts
// content/path/custom-classes.ts
const customClasses = [
  "custom-class-01",
  "custom-class-02",
];

export default customClasses;
```

```css
/* css/path/custom-styles.css */
:root {
  --custom-property-01: 50% 50%;
  --custom-property-02: 0 4px 4px rgb(0 0 0 / 0.2);
}
```

```ts
// vite.config.ts
import pluginPurgeCss from "@myelophone/vite-plugin-purgecss";

export default {
  plugins: [
    pluginPurgeCss({
      content: ["content/path/custom-classes.ts"],
      css: ["css/path/custom-styles.css"],
      variables: true,
    }),
  ],
};

```

⚠️ **Note**:

- Using the `content` or `css` options circumvents the Vite build process
(i.e., these values will only be seen by the PurgeCSS process). Do not pass
files to these options that require processing by Vite.

### With CSS Modules

Vite uses [postcss-modules](https://github.com/css-modules/postcss-modules) to
handle CSS modules, exporting a JSON object with initial class names as keys
and local hashed class names as values. This feature allows
`@myelophone/vite-plugin-purgecss` to pick up the modified class names using the
default `content` array. Therefore, there should be no further configuration
needed to support CSS Modules.

If you would like to customize this behavior, see the [Options](#%EF%B8%8F-options)
section for more information on configuring Vite and PurgeCSS output.

## ⚙️ Options

An `Options` object may be passed as the only argument to the plugin. The shape
of the options object matches that of the
[PurgeCSS configuration file](https://purgecss.com/configuration.html). Refer
to the PurgeCSS documentation for more information on how to configure
PurgeCSS.

```ts
type Options = Partial<UserDefinedOptions>;

interface UserDefinedOptions {
  content: Array<string | RawContent>;
  css: Array<string | RawCSS>;
  defaultExtractor?: ExtractorFunction;
  extractors?: Array<Extractors>;
  fontFace?: boolean;
  keyframes?: boolean;
  output?: string;
  rejected?: boolean;
  rejectedCss?: boolean;
  sourceMap?: boolean | (postcss.SourceMapOptions & {
      to?: string;
  });
  stdin?: boolean;
  stdout?: boolean;
  variables?: boolean;
  safelist?: UserDefinedSafelist;
  blocklist?: StringRegExpArray;
  skippedContentGlobs?: Array<string>;
  dynamicAttributes?: string[];
}
```

⚠️ **Note**:

- The `content` and `css` options are not required when using the plugin. All
chunks and non-CSS assets in the bundle will automatically be added to the
`content` array as raw values. Likewise, CSS assets will be added to the
`css` array.
- Custom filenames, globs, and raw values can be passed to the `content` and
`css` options to include files that are not present in the bundle. These
arrays will be concatenated with the `content` and `css` arrays retrieved
from the bundle.

## 🤔 Caveats

- The plugin utilizes the [generateBundle](https://rollupjs.org/plugin-development/#generatebundle)
Rollup build hook, an [output generation hook](https://vitejs.dev/guide/api-plugin.html#universal-hooks)
that is not called during dev. Therefore, PurgeCSS will not modify CSS assets
while using Vite's dev server.
- The result of using the plugin mimics that of calling the PurgeCSS CLI with
the output of a Vite build. The plugin seeks to include this operation within
the `vite build` command itself. The following commands provide an example of
how this functionality could be implemented using the PurgeCSS CLI.

  ```sh
  # Using the default output directory: "dist/"
  vite build
  purgecss --css 'dist/**/*.css' --content 'dist/**/*.!(css)'
  ```

## 📄 License

MIT License © 2025 [Aliaksandr Ivanou](https://github.com/myelophone)

MIT License © 2023 [Joe Stanley](https://github.com/mojojoejo)
