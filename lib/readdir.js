var path = require('path');
var recursive = require('recursive-readdir');

module.exports = readPromise;

function readPromise(dir, excluded) {
  excluded = excluded || [];
  return new Promise((resolve, reject) => {
    recursive(dir, excluded, (err, files) => {
      if (err) {
        return reject(err);
      }
      resolve(files);
    });
  });
};