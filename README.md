# React Native Detector de Event Races
Repositório utilizado para o TCC sobre o tema de detecção de event races para aplicações desenvolvidas em React Native

#
## Detalhes

Este projeto tem como objetivo a validação de possíveis ocorrências de event races em aplicativos desenvolvidos com React Native (Os testes foram feitos apenas em aplicativos `androids` criados através do comando `create-react-native-app`)

Este repositório conta com uma aplicação de teste para facilitar a utilização da ferramenta, disponível na pasta `ProjectAxios`

#

## Execução da Ferramenta

Para realizar a instrumentação do código os seguintes passos são necessários:

* Adicionar o arquivo `monkeyPatch.js` na raiz do projeto React Native
* Verificar no arquivo `/android/app/build.gradle` se a variável `enableHermes` está marcado como falsa. Caso contrário a alteração é necessária, além da instalação do pacote npm realizado a partir do comando `npm install proxy-polyfill`
* Caso a instalação do pacote `proxy polyfill` tenha sido realizada na etapa anterior, é necessário adicionar a linha `import 'proxy-polyfill'` no início do arquivo `monkeyPatch.js`
* Adicionar no arquivo inicial do projeto React Native `/index.js/` os comandos: `import PatchPromise from './monkeyPatch';` e `PatchPromise();` antes do comando `AppRegistry.registerComponent(appName, () => App);`

Com isso é necessário iniciar sua aplicação react native, normalmente com os comandos `react-native start` e `react-native run-android`.

Com o aplicativo executando é necessário que a depuração no navegador seja ativada, com isso os logs personalizados inseridos através da instrumentação de código poderão ser salvos a partir do console do navegador, clicando com o botão direito e selecionando a opção `save as`

Para iniciar a utilização da ferramenta os seguintes passos são necessários:

* Adicionar o arquivo de log salvo na pasta `/PostProcessing/input/` com o nome `log.txt`
* Executar a partir de um terminal bash o comando `./index.sh`
* Feito isso uma nova aba no navegador ira se abrir com os resultados.
