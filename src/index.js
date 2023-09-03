// Importando a função de conexão a partir do módulo connection
const connect = require('./connection')

// Importando a função de middlewares a partir do módulo middlewares
const middlewares = require('./middlewares')

// Função assíncrona que inicia o bot
async function start() {
  // Estabelece a conexão com o bot (ou outra entidade)
  const AngelusBot = await connect();

  // Carrega e aplica os middlewares para o bot
  await middlewares(AngelusBot)
}

// Inicia a execução da função start
start();