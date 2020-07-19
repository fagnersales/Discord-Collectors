const { SimpleReactionCollector } = require('./index')
const { Client } = require('discord.js')

const client = new Client()

client.on("ready", () => console.log(`Running an example command 😜`))

client.on("message", message => {

    const pongCommand = (author) => {

        // A função "collected" será invocada sempre qe uma reação for coletada
        // A função "ignored" será invocada se o usuário não reagir e o tempo acabar
        // A função "any" será invocada se nenhum dos dois acontecer
      
        // As opções são as mesmas de um ReactionCollector, com uma opção a mais
        // filterForUser: true
        // Significa que, somente o `author` que é passado no 3° parametro terá a reação contada!
        // padrão: { time: 35000, max: 1, filterForUser: true }

        const collectedFunction = (reaction, user, usedMessage) =>{
            console.log(`[COLLECT] O usuário ${user.username} reagiou com ${reaction.emoji.name} na mensagem: ${usedMessage.content}`)
        }

        SimpleReactionCollector(message.channel.send(`Pong! 🏓`), '🏓', {
            // você pode inserir sua função após a chave
            collect: collectedFunction, // Sempre que uma reação for coletada

            // ou inserir a função diretamente aqui 
            limit(collectedReactions, usedMessage) { // Quando atingir o limite de reações imposto nas opções 
                console.log(`[LIMIT] ${collectedReactions.size} reações foram coletadas na mensagem: ${usedMessage.content}`)
            },
            // A vantagem de escrever dentro deste objeto, é que você terá acesso aos parametros que a função irá receber
            end(collectedReactions, reason, usedMessage) {
                console.log(`[END] O coletor terminou pelo motivo: ${reason}! ${collectedReactions.size} reações foram coletadas na mensagem: ${usedMessage.content}`)
            }
        }, 
        { 
            // Após o parametro de funções, vem as opções, não é obrigatório e ela tem todas as opções de um reaction collector, com uma diferença
            // temos a opção `filterForUser` que só ira aceitar reações do autor especificado
            // caso não seja invocada, ela irá aceitar reação de qualquer pessoa! (Exceto do Bot)
           filterForUser: author,
           time: 35000, // Por padrão é 35000 (35 segundos em milisegundos)
           max: 3 // por padrão é 1  
        })

    }

    if (message.content.toLowerCase() == "!ping") pongCommand(message.author)

})

client.login('some-crazy-token')