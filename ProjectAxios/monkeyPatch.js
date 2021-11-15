//Descomentar linha abaixo e adicionar a biblioteca com 'npm install proxy-polyfill' caso 'Proxy' não seja reconhecido
//import 'proxy-polyfill'

export default function PatchPromise() {
  //Utilizado para instrumentação da classe Promise
  const global = window;
  const OldPromise = global.Promise;
  //Contadores para analise
  let ___promiseIDCounter = 0;
  let ___resolvedNumber = 0;
  let ___rejectedNumber = 0;
  let ___pendentNumber = 0;
  //Instrumentação
  global.Promise = class Promise extends OldPromise {
    constructor(executor) {
      //Proxy no método executor
      executor = new Proxy(executor, {
        apply: function (target, thisArg, argsList) {
          //Iterando o id das promises
          const ___currPromiseID = ++___promiseIDCounter;
          //Calculo de Promises pendentes dado o número de promises criadas e subtraindo o número de promises rejeitadas e resolvidas
          ___pendentNumber = ___promiseIDCounter - (___resolvedNumber + ___rejectedNumber);
          //Log da promise criada, contendo: ID, Status (criado) e Stack Trace
          console.log(`l#{PromiseID: ${___currPromiseID}, Status: 'Created', Trace: String.raw\``);
          console.log(new Error().stack);
          console.log('`')
          console.log('}l#');
          //Log para análise de promises criadas, resolvidas, rejeitadas e pendentes pela aplicação. 
          console.log(`l#{ResolvedPromises: ${___resolvedNumber}, RejectedPromises: ${___rejectedNumber}, PendentPromises: ${___pendentNumber}}l#`,
          );
          
          //Instrumentação das Promises resolvidas, método é o primeiro argumento (index = 0)
          if (argsList.length > 0 && typeof argsList[0] === 'function') {
            argsList[0] = new Proxy(argsList[0], {
              apply: function (target, thisArg, argsList) {
                //Iterando o número de promises resolvidas
                ___resolvedNumber++;
                //Calculo de Promises pendentes dado o número de promises criadas e subtraindo o número de promises rejeitadas e resolvidas
                ___pendentNumber = ___promiseIDCounter - (___resolvedNumber + ___rejectedNumber);
                //Log da promise resolvida, contendo: ID, Status (resolvido) e Stack Trace
                console.log(`l#{PromiseID: ${___currPromiseID}, Status: 'Resolved', Trace: String.raw\``);
                console.log(new Error().stack);
                console.log('`')
                console.log('}l#');
                //Log para análise de promises criadas, resolvidas, rejeitadas e pendentes pela aplicação. 
                console.log(`l#{ResolvedPromises: ${___resolvedNumber}, RejectedPromises: ${___rejectedNumber}, PendentPromises: ${___pendentNumber}}l#`);                return Reflect.apply(target, thisArg, argsList);
              },
            });
          }

          //Instrumentação das Promises rejeitadas, método é o segundo argumento (index = 1)
          if (argsList.length > 1 && typeof argsList[1] === 'function') {
            argsList[1] = new Proxy(argsList[1], {
              apply: function (target, thisArg, argsList) {
                //Iterando o número de promises rejeitadas
                ___rejectedNumber++;
                //Calculo de Promises pendentes dado o número de promises criadas e subtraindo o número de promises rejeitadas e resolvidas
                ___pendentNumber = ___promiseIDCounter - (___resolvedNumber + ___rejectedNumber);
                //Log da promise rejeitada, contendo: ID, Status (rejeitado) e Stack Trace
                console.log(`l#{PromiseID: ${___currPromiseID}, Status: 'Rejected', Trace: String.raw\``);
                console.log(new Error().stack);
                console.log('`')
                console.log('}l#');
                //Log para análise de promises criadas, resolvidas, rejeitadas e pendentes pela aplicação. 
                console.log(`l#{ResolvedPromises: ${___resolvedNumber}, RejectedPromises: ${___rejectedNumber}, PendentPromises: ${___pendentNumber}}l#`);                return Reflect.apply(target, thisArg, argsList);
              },
            });
          }
          
          return Reflect.apply(target, thisArg, argsList);
        },
      });

      super(executor);
    }
  };
  
}

