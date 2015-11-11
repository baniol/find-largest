var readDir = require('./lib/readdir');
var getStats = require('./lib/getstats');

module.exports = findLargest;

function findLargest(dir, number, extension, excluded, formatStr) {

  var formatTypes = {
    k: 1000,
    m: 1000000
  };
  var format = formatTypes[formatStr] || 1;
  var sizeStr = (format == 1) ? '' : formatStr.toUpperCase();

  return readDir(dir, excluded).then(tree => {
      return getStats(dir, tree);
    })
    .then(stats => {
      return Promise.all(stats).then(stats => {
        return stats;
      });
    })
    .then(stats => {
      var result = stats
        .filter(stat => {
          var test = true;
          if (extension) {
            var reg = new RegExp('\.' + extension + '$');
            test = reg.test(stat.fileName);
          }
          return stat.isFile() && test;
        })
        .sort(function(a, b) {
          return a.size - b.size;
        })
        .map((file, index) => {
          return {
            path: file.fullPath,
            name: file.fileName,
            size: Math.round((file.size) / format * 100) / 100 + ' ' + sizeStr + 'B'
          };
        });
      result.splice(0, result.length - number);
      return result.reverse();
    })
    // @TODO error handling
    .catch(err => console.log(err.stack));
}