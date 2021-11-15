var promises = require("../logs/processedPromises");

//console.log(promises);

var fs = require("fs");
const readline = require("readline");

//Arquivo para armazenar vetor com estado completo das promises
fs.writeFile("../logs/resolvedPromises.js", "", function (err) {
  if (err) return console.log(err);
});

//Leitura do arquivo txt com todas as promises
const readInterface2 = readline.createInterface({
  input: fs.createReadStream('../logs/processed.txt'),
  output: process.stdout,
  console: false,
});

//Cria inicio do vetor
fs.appendFileSync("../logs/resolvedPromises.js", `var promisesArray = [\n`, function (err) {
  if (err) throw err;
});

//Faz um append das promises criadas, resolvidas e rejeitadas na ordem correta para o vetor
readInterface2.on("line", function (line) {
  promises.map(promise => {
    if(line.includes('PromiseID: ' + promise.PromiseID +',')) {
      fs.appendFileSync("../logs/resolvedPromises.js", `${line},\n`, function (err) {
        if (err) throw err;
        console.log(line);
      });
    }
  })
});