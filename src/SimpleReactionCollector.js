const SimpleReactionCollector = async (_message, emoji, functions, _options = {}) => {
    if (!_message) throw new Error(':missing_message: Você precisa enviar um objeto message ou enviar como parametro.')

    if (!emoji) throw new Error(':missing_emoji: Você precisa definir o emoji a ser utilizado.')

    const message = _message.then ? await _message : _message

    const usedMessage = message

    await message.react(emoji)


    const options = { filterForUser: false, time: 35000, max: 1, ..._options }


    const filterForUser = (reaction, user) =>
        (user.id === options.filterForUser.id) &&
        (reaction.emoji.name === emoji || reaction.emoji.id === emoji.id)

    const filterForEveryone = (reaction) =>
        (reaction.emoji.name === emoji || reaction.emoji.id === emoji.id)


    const filter = options.filterForUser ? filterForUser : filterForEveryone

    const collect = (...params) => {
        if (functions.collect && typeof functions.collect === "function") functions.collect(...params)
    }

    const limit = (...params) => {
        if (functions.limit && typeof functions.limit === "function") functions.limit(...params)
    }

    const end = (...params) => {
        if (functions.end && typeof functions.limit === "function") functions.end(...params)
    }

    message.createReactionCollector(filter, options)
        .on("collect", (reaction, user) => collect(reaction, user, usedMessage))

        .on("end", (collectedReactions, reason) => {
            if (reason == "limit") return limit(collectedReactions, usedMessage)
            else end(collectedReactions, message, reason)
        })

        .on("end", (reactions, reason) => end(reactions, reason, message))

}

module.exports = SimpleReactionCollector
