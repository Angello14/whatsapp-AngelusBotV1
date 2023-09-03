// Importando o módulo 'path' para lidar com caminhos de arquivos e diretórios
const path = require('path')

// Prefixo usado para identificar comandos ou ações do bot
const PREFIX = '/'

// Emoji que representa o bot
const BOT_EMOJI = '👺️'

// Caminho absoluto para a pasta temporária usada pelo bot
const TEMP_FOLDER = path.resolve(__dirname, '..', 'assets', 'temp')

// Exportando as constantes para uso em outros módulos
module.exports = {
  BOT_EMOJI,
  PREFIX,
  TEMP_FOLDER
}