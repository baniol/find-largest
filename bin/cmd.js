#!/usr/bin/env node

"use strict";

var findLargest = require('..');
var minimist = require('minimist');
var path = require('path');
var fs = require('fs');

const defaultNumber = 5;
const defaultPath = './';

var argv = minimist(process.argv.slice(2), {
  alias: {p: 'path', n: 'number', x: 'extension', e: 'exclude', f: 'format', h: 'help'}
});

if (argv.help) {
  fs.createReadStream(__dirname + '/usage.txt').pipe(process.stdout);
  return;
}

var dir = argv.path || defaultPath;
var number = argv.number || defaultNumber;
var extension = argv.extension || null;
var format = argv.format || null;
var excluded = [];
if (argv.exclude) {
  excluded = argv.exclude.split(',');
}
var options = {
  dir: dir,
  number: number,
  extension: extension,
  excluded: excluded,
  format: format
};

findLargest(options).then(result => console.log(result));

