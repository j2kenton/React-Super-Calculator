const autoprefixer = require('autoprefixer');
const postcssMergeRules = require('postcss-merge-rules');
const postcssMergeLonghands = require('postcss-merge-longhand');
const postcssMergeIdents = require('postcss-merge-idents');
const cssMqPacker = require('css-mqpacker');
const postcssSvgGo = require('postcss-svgo');
const discardComments = require('postcss-discard-comments');

module.exports = () => [
  discardComments,
  autoprefixer,
  postcssMergeRules,
  postcssMergeLonghands,
  postcssMergeIdents,
  cssMqPacker,
  postcssSvgGo
];
