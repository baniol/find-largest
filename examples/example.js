var findLargest = require('..');
var path = require('path');

var options = {
  dir: path.join(__dirname, '..'),
  number: 3,
  extension: 'js',
  excluded: ['node_modules'],
  format: 'k'
};

findLargest(options)
  .then(function (largest) {
    console.log(largest);
  });
