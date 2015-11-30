var readDir = require('./lib/readdir');
var getStats = require('./lib/getstats');

module.exports = findLargest;

function findLargest(options) {

  var formatTypes = {
    k: 1000,
    m: 1000000
  };
  var format = formatTypes[options.format] || 1;
  var sizeStr = (format == 1) ? '' : options.format.toUpperCase();

  return readDir(options.dir, options.excluded).then(tree => {
      return getStats(options.dir, tree);
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
          if (options.extension) {
            var reg = new RegExp('\.' + options.extension + '$');
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
      result.splice(0, result.length - options.number);
      return result.reverse();
    })
    // @TODO error handling
    .catch(function (err) {
      throw Error(err);
    });
}
