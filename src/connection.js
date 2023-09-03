// Importando módulos e funções necessárias de '@whiskeysockets/baileys'
const { default: makeWASocket, DisconnectReason, useMultiFileAuthState } = require('@whiskeysockets/baileys')

// Função assíncrona para realizar a conexão com o bot
async function connect() {
  // Carrega ou cria um estado de autenticação multifornecedor a partir de um arquivo
  const { state, saveCreds } = await useMultiFileAuthState('./assets/auth/baileys')

  // Cria uma instância de conexão usando o makeWASocket
  const AngelusBot = makeWASocket({
    printQRInTerminal: true,
    auth: state,
    defaultQueryTimeoutMs: undefined
  })
  
  // Define um ouvinte para atualizações de conexão
  AngelusBot.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update
    
    // Verifica se a conexão foi fechada
    if (connection === 'close') {  
      // Verifica se a desconexão foi devido a um logout
      const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut
      
      // Se for necessário reconectar, chama a função connect novamente
      if (shouldReconnect) {
        connect()
      }
    }
  })
  
  // Define um ouvinte para atualizações de credenciais e salva as credenciais
  AngelusBot.ev.on('creds.update', saveCreds)
  
  // Retorna a instância do bot para uso externo
  return AngelusBot
}

// Exporta a função connect para uso em outros módulos
module.exports = connect;