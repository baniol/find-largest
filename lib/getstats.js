var fs = require('fs');
var path = require('path');

module.exports = getStats;

function getStats(dir, files) {
  var promises = files.map(file => {
    return new Promise((resolve, reject) => {
      // var filePath = path.join(dir, file);
      fs.stat(file, (err, stat) => {
        if (err) {
          // return reject(err);
          return;
        }
        // var fullPath = path.resolve(filePath);
        stat.fileName = path.basename(file);
        stat.fullPath = file;
        resolve(stat);
      });
    });
  });
  return promises;
}