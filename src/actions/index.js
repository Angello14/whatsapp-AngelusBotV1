// Importando constantes e módulos necessários
const { BOT_EMOJI, TEMP_FOLDER } = require("../config")
const { extractDataFromMessage, downloadImage } = require("../utils")
const path = require('path')
const { exec } = require('child_process')
const fs = require('fs')

// Classe de ações do bot
class Actions {
  constructor(AngelusBot, baileysMessage) {
    // Extrai dados relevantes da mensagem
    const { remoteJid, args, isImage } = extractDataFromMessage(baileysMessage)
    
    // Inicializa propriedades da classe
    this.AngelusBot = AngelusBot
    this.remoteJid = remoteJid
    this.args = args
    this.isImage = isImage
    this.baileysMessage = baileysMessage
  }

  // Função para criar uma figurinha a partir de uma imagem
  async sticker() {
    if (!this.isImage) {
      // Envia mensagem de erro se a entrada não for uma imagem
      await this.AngelusBot.sendMessage(this.remoteJid, { text: `${BOT_EMOJI} ❌️ Erro! Você precisa enviar uma imagem.` })
      return
    }
    
    // Obtém o caminho da imagem de entrada e o caminho de saída
    const inputPath = await downloadImage(this.baileysMessage, 'input')
    const outputPath = path.resolve(TEMP_FOLDER, 'output.webp')
    
    // Executa o comando ffmpeg para converter a imagem em uma figurinha
    exec(`ffmpeg -i ${inputPath} -vf scale=512:512 ${outputPath}`, async (error) => {
      if (error) {
        // Envia mensagem de erro se houver um problema na conversão
        await this.AngelusBot.sendMessage(this.remoteJid, { text: `${BOT_EMOJI} ❌️ Erro ao converter a imagem para a figurinha.` })
        return
      }
      
      // Envia a figurinha criada como uma mensagem
      await this.AngelusBot.sendMessage(this.remoteJid, {
        sticker: { url: outputPath }
      })
      
      // Remove os arquivos temporários após o uso
      fs.unlinkSync(inputPath)
      fs.unlinkSync(outputPath)
    })
  }
}

// Exporta a classe Actions para uso em outros módulos
module.exports = Actions