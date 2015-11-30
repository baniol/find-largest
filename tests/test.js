var findLargest = require('..');

var options = {
  dir: __dirname,
  number: 3,
  //extension: '',
  excluded: ['node_modules'],
  format: 'k'
};

findLargest(options)
  .then(function (largest) {
    console.log(largest);
  });
