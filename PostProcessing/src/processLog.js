  var fs = require("fs");
  const readline = require("readline");
  //Arquivo de saida com txt contendo todas as promises
  fs.writeFile("../logs/processed.txt", "", function (err) {
    if (err) return console.log(`Erro: ${err}`);
  });
  //Recebe o arquivo com o log original 
  const readInterface = readline.createInterface({
    input: fs.createReadStream('../input/log.txt'),
    output: process.stdout,
    console: false,
  });

  var status = 'finished';
  //Escreve no arquivo somente as linhas envoltas por l#{}l#
  readInterface.on("line", function (line) {
    let formattedObject = '';

    //Cria arquivo que guarda quantidade de promises criadas e outros detalhes
    if (line.includes("l#{") && line.includes("}l#")) {
      formattedObject = line;
      formattedObject = formattedObject.substring(
        formattedObject.lastIndexOf("l#{") + 2, 
        formattedObject.lastIndexOf("}l#") + 1
    );
      fs.appendFileSync("../logs/details.txt", `${formattedObject} \n`, function (err) {
        if (err) throw err;
        //console.log(line);
      });
    }

    //Logs com traces
    if (line.includes("l#{") && !line.includes("}l#")) {
      status = 'started'
      formattedObject = line.split("l#").pop();
      fs.appendFileSync("../logs/processed.txt", `${formattedObject}`, function (err) {
        if (err) throw err;
        //console.log(line);
      });
    }

    if (!line.includes("l#{") && line.includes("}l#")) {
      status = 'finished'
      formattedObject = '}' + '\n';
      fs.appendFileSync("../logs/processed.txt", `${formattedObject}`, function (err) {
        if (err) throw err;
        //console.log(line);
      });
    }

    if (!line.includes("l#{") && !line.includes("}l#") && status == 'started') {
      fs.appendFileSync("../logs/processed.txt", `${line}`, function (err) {
        if (err) throw err;
        //console.log(line);
      });
    }


  });
