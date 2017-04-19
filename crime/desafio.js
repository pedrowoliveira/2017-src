var fs = require('fs');
const readline = require('readline');
var rl;
var info_do_crime;
var teoria;
var data;
var crime = [];
var teoria = [];
var erros = [];
var json;
var sair = false;

function ler_informacoes()
{
  data = JSON.parse(fs.readFileSync('desafio_crime.json'));
  // Checar se há definição de assassino.
  if(data.assassino == -1 || data.local == -1 || data.arma == -1)
  {
    gerar_crime();
    escrever_crime();
  }
  else {
    console.log("Já existe crime definido.");
    ler_crime();
    escrever_crime();
  }
}
function escrever_crime()
{
  console.log("O crime é " + crime[0] + " " + crime[1] + " " + crime[2]);
}
function ler_crime()
{
  crime.push(data.assassino);
  crime.push(data.local);
  crime.push(data.arma);
}
function gerar_crime()
{
  // Gera o crime
  console.log("Não existe crime definido. Gerando crime...");
  var n;
  n = data.assassinos.length - 1;
  crime.push( getRandomInt(0, n ) );
  n = data.locais.length - 1;
  crime.push(getRandomInt(0, n ) );
  n = data.armas.length - 1;
  crime.push(getRandomInt(0, n ) );
  data.assassino = crime[0];
  data.local = crime[1];
  data.arma = crime[2];
  salvar();
}
function ler_teoria()
{
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Digite sua teoria <assassino> <local> <arma> >"
  });

  rl.question("Qual sua teoria? Digite-a no formato <assassino> <local> <arma>", (line) => {
    line = line.trim();
    if(line.length < 5)
    {
      console.log("Ocorreu um erro: ");
      ler_teoria();
    }
    else
    {
      var temp = [];
      temp.push( parseInt(  line.substr(0, 1) ) );
      temp.push( parseInt( line.substr(2,1) ) );
      temp.push( parseInt( line.substr(4,1) ) );
      registrar_teoria(temp);
    }
    rl.close();
  });
}
function registrar_teoria(param)
{
  teoria = param;
  console.log("Sua teoria foi salva, ela é:");
  console.log("Assassino: [" + teoria[0] + "] (" + data.assassinos[teoria[0]] + ")");
  console.log("Local: [" + teoria[1] + "] (" + data.locais[teoria[1]] + ")");
  console.log("Arma: [" + teoria[2] + "] (" + data.armas[teoria[2]] + ")");
  console.log("Número da teoria: " + (++data.numero_de_teorias));
  salvar();
}
function verificar()
{
  if(crime[0] != teoria[0])
    erros.push(1);
  if(crime[1] != teoria[1])
    erros.push(2);
  if(crime[2] != teoria[2])
    erros.push(3);
  if(erros.length == 0)
  {
    sair == true;
  }
  else
  {
      imprimir_erro();
  }
}
function imprimir_erro()
{
  console.log("Você cometeu erros. O código é: " + erros[getRandomInt(0, erros.length - 1)]);
}
function salvar()
{
  json = JSON.stringify(data);
  console.log("salvando...");
  fs.writeFileSync('desafio_crime.json', json);
  console.log("salvo...");
}
do {
  ler_informacoes();
  ler_teoria();
  verificar();
  if(sair)
  {
    console.log("Você descobriu o criminoso. Número de tentativas: " + data.numero_de_teorias);
  }
} while(!sair)
reiniciar();
function reiniciar()
{
  console.log("Reinciando jogo...");
  data.numero_de_teorias = 0;
  data.assassino = -1;
  data.local = -1;
  data.arma = -1;
  salvar();
}

// JS pls
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
