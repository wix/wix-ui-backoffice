#!/usr/bin/env bash
const path = require('path');
const createExports = require('wix-ui-core/scripts/named-export');

const src = path.resolve(__dirname, '../src');
const coreSrc = path.join(src, 'components/core');
const ignoreCoreSrc = `${coreSrc}/**/*`;

createExports(['components'], src, { ignore: ignoreCoreSrc });
createExports(['*'], coreSrc);
