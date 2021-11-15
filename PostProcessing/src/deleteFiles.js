const fs = require('fs');

try {
  fs.unlinkSync('../logs/processed.txt');
}
catch(err) {}
try {
  fs.unlinkSync('../logs/details.txt');
}
catch(err) {}
try {
  fs.unlinkSync('../logs/processedPromises.js');
}
catch(err) {}
try {
  fs.unlinkSync('../logs/resolvedPromises.js');
}
catch(err) {}

console.log('Cleaning files...')