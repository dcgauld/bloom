const atImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const fs = require('fs-extra');
const path = require('path');
const postcss = require('postcss');

const inputPath = path.resolve(__dirname, '../bloom.css');
const inputFile = fs.readFileSync(inputPath, 'utf8');

function process(minify = false) {
  const plugins = [atImport(), autoprefixer()];
  const outputPath = path.resolve(
    __dirname,
    `../build/bloom.${minify ? 'min.' : ''}css`
  );

  if (minify) {
    plugins.push(cssnano({ preset: 'default' }));
  }

  return postcss(plugins)
    .process(inputFile, { from: inputPath, to: outputPath })
    .then((result) => fs.outputFile(outputPath, result.css));
}

function build() {
  return Promise.all([process(), process(true)]);
}

build().then(() => {
  console.log('Done.');
});
