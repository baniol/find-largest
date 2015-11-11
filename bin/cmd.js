#!/usr/bin/env node

var findLargest = require('../');
var minimist = require('minimist');
var path = require('path');
var fs = require('fs');

(function () {
  "use strict";
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

  findLargest(dir, number, extension, excluded, format).then(result => console.log(result));
})();
