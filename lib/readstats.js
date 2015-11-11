var fs = require('fs');
var path = require('path');

module.exports = getStats;

function getStats(dir, files) {
  var promises = files.map(file => {
    return new Promise((resolve, reject) => {
      fs.stat(path.join(dir, file), (err, stat) => {
        resolve(stat);
      });
    });
  });
  return promises;
}
