
  var fs = require("fs");
  const readline = require("readline");
  //Cria arquivo com vetor das promises criadas (apenas as que serão analisadas)
  fs.writeFile("../logs/processedPromises.js", "", function (err) {
    if (err) return console.log(err);
  });
  //Leitura do arquivo processed.txt
  const readInterface = readline.createInterface({
    input: fs.createReadStream('../logs/processed.txt'),
    output: process.stdout,
    console: false,
  });
  //Adiciona formato de vetor no inicio do arquivo
  fs.appendFileSync("../logs/processedPromises.js", `module.exports = promisesArray = [\n`, function (err) {
    if (err) throw err;
  });
  //Salva informação das promises criadas no contexto de "fetch" e "xhrAdapter"
  readInterface.on("line", function (line) {
    if (line.includes('at fetch') || line.includes('at xhrAdapter')) {
      fs.appendFileSync("../logs/processedPromises.js", `${line},\n`, function (err) {
        if (err) throw err;
        console.log(line);
      });
    }
  });
