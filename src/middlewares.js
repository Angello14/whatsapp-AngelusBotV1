// Importando o emoji do bot a partir do módulo de configuração
const { BOT_EMOJI } = require('./config')

// Importando funções utilitárias do módulo utils
const { isCommand, extractDataFromMessage } = require('./utils')

// Importando o módulo de ações
const Actions = require('./actions')

// Função que define os middlewares para processar mensagens
async function middlewares(AngelusBot) {
  // Definindo um evento para quando mensagens são atualizadas ou inseridas
  AngelusBot.ev.on('messages.upsert', async ({ messages }) => {
    // Pegando a primeira mensagem da lista
    const baileysMessage = messages[0]

    // Verificando se a mensagem existe e é um comando
    if (!baileysMessage?.message || !isCommand(baileysMessage)) {
      return
    }

    // Inicializando uma instância da classe Actions
    const actions = new Actions(AngelusBot, baileysMessage)

    // Extraindo dados relevantes da mensagem
    const { command, remoteJid } = extractDataFromMessage(baileysMessage)

    // Usando um switch case para executar ação com base no comando
    switch (command.toLowerCase()) {
      case 'f':
        await actions.sticker()
        break
      case 'ping':
        // Enviando uma mensagem de resposta "Pong!" com o emoji do bot
        await AngelusBot.sendMessage(remoteJid, { text: `${BOT_EMOJI} Pong!` })
        break
      // Adicione mais cases conforme necessário
    }
  })
}

// Exportando a função middlewares para uso externo
module.exports = middlewares