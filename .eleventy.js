require('dotenv').config();

const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginNavigation = require('@11ty/eleventy-navigation');
const pluginPWA = require('@pragmatics/eleventy-plugin-pwa');
const markdownIt = require('markdown-it');
const markdownItImsize = require('markdown-it-imsize');
const yaml = require('js-yaml');

const filters = require('./utils/filters.js');
const transforms = require('./utils/transforms');
const shortcodes = require('./utils/shortcodes');
const shortcodesPaired = require('./utils/shortcodes-paired');
const iconsprite = require('./utils/iconsprite');

const isProd = process.env.ELEVENTY_ENV === 'production';

const contentfulPages = require('./src/api/contentful-page');

const markdownItConfig = {
  html: true,
  breaks: false,
  linkify: true,
  typographer: true,
};

module.exports = function (config) {
  // Plugins
  config.addPlugin(pluginRss);
  config.addPlugin(pluginNavigation);

  if (isProd)
    config.addPlugin(pluginPWA, {
      inlineWorkboxRuntime: true,
    });

  // Filters
  Object.keys(filters).forEach((filterName) => {
    config.addFilter(filterName, filters[filterName]);
  });

  config.addFilter('md', (content = '') =>
    markdownIt(markdownItConfig).use(markdownItImsize).render(content)
  );

  // Transforms
  Object.keys(transforms).forEach((transformName) => {
    config.addTransform(transformName, transforms[transformName]);
  });

  // Shortcodes
  Object.keys(shortcodes).forEach((shortcodeName) => {
    config.addShortcode(shortcodeName, shortcodes[shortcodeName]);
  });

  // Paired Shortcodes
  Object.keys(shortcodesPaired).forEach((shortcodeName) => {
    config.addPairedShortcode(shortcodeName, shortcodesPaired[shortcodeName]);
  });

  // Collections
  config.addCollection('pages', contentfulPages);

  // Icon Sprite
  config.addNunjucksAsyncShortcode('iconsprite', iconsprite);

  // Asset Watch Targets
  config.addWatchTarget('./src/assets');

  // Markdown
  config.setLibrary('md', markdownIt(markdownItConfig).use(markdownItImsize));

  // Data extensions
  config.addDataExtension('yml', (contents) => yaml.safeLoad(contents));

  // Browsersync config
  config.setBrowserSyncConfig({
    open: true,
  });

  // Layouts
  config.addLayoutAlias('base', 'base.njk');
  config.addLayoutAlias('post', 'post.njk');

  // Pass-through files
  config.addPassthroughCopy('src/robots.txt');
  config.addPassthroughCopy('src/site.webmanifest');
  config.addPassthroughCopy('src/browserconfig.xml');
  config.addPassthroughCopy('src/assets/images');
  config.addPassthroughCopy('src/assets/fonts');

  // Deep-Merge
  config.setDataDeepMerge(true);

  // Base Config
  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: 'includes',
      layouts: 'layouts',
      data: 'data',
    },
    templateFormats: ['njk', 'md', '11ty.js'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
