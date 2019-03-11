const fs = require('fs');
const glob = require('glob');
const path = require('path');
const ProgressBar = require('progress');

const targetDir = path.resolve(__dirname, '..', 'dist/es/src/components');

const STYLABLE_PATTERN = '/**/*.st.css';
const STYLABLE_ES_PATTERN = '/**/*.es.st.css';
const files = glob.sync(targetDir + STYLABLE_PATTERN, { ignore: [ targetDir + STYLABLE_ES_PATTERN ] });

const progress = new ProgressBar(
  'Transpiling es style import paths in `dist/es` :bar :percent',
  {
    total: files.length,
  },
);

files.forEach(filepath => {
  fs.readFile(filepath, 'utf-8', function (e, content) {
    if (e != null) {
      console.warn(e);
      return;
    }
    const codeWithEsImport = content.replace(/wix\-ui\-core\/index\.st\.css/g, 'wix-ui-core/index.es.st.css');
    fs.writeFile(filepath, codeWithEsImport, function (e) {
      if (e) {
        console.warn(e);
        return;
      }
      progress.tick(1);
    });
  });
});
