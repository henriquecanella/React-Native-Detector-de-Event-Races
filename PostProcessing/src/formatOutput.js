var fs = require("fs");

//Finaliza o formato do vetor criado no arquivo outputResolvedOrder.js
fs.appendFileSync("../logs/resolvedPromises.js", `]`, function (err) {
  if (err) throw err;
  console.log(line);
});
