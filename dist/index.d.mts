import { Plugin } from 'vite';
import { UserDefinedOptions, RawContent, RawCSS } from 'purgecss';

/**
 * Plugin options for `vite-plugin-purgecss` vite plugin.
 */
declare type Options = Partial<UserDefinedOptions>;
/**
 * Content that should be analyzed by PurgeCSS.
 */
declare type PurgeCssContent = (string | RawContent<string>)[];
/**
 * CSS that should be processed by PurgeCSS.
 */
declare type PurgeCssStyles = (string | RawCSS)[];

declare const cssRegExp: RegExp;
/**
 * Vite plugin for removing unused CSS from generated bundles with PurgeCSS.
 *
 * **Note**: This plugin will not be called during dev due to its use of the
 * `generateBundle` output generation hook.
 *
 * @param opts plugin options
 * @returns purgecss vite plugin
 */
declare function purgeCssPlugin(opts?: Options): Plugin;
/**
 * Convert bundle contents to string, if needed.
 *
 * @param source string or binary data buffer
 * @returns `source` as string
 */
declare function sourceString(source: string | Uint8Array): string;

export { type Options, type PurgeCssContent, type PurgeCssStyles, cssRegExp, purgeCssPlugin as default, sourceString };
