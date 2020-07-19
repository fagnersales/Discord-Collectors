// Type definitions for discord-collectors
// Project: dsicord-collectors
// Definitions by: Fagner Sales <https://github.com/fagnersales/>

import {
    Message,
    User,
    ReactionEmoji,
    ReactionCollectorOptions,
    MessageReaction,
    Collection,
    Snowflake
} from 'discord.js'

interface ObjectFunctions {
    collect(reaction: MessageReaction, user: User, usedMessage: Message): any
    limit(collectedReactions: Collection<String, MessageReaction>, usedMessage: Message): any
    end(collectedReactions: Collection<String, MessageReaction>, reason: String, usedMessage: Message): any
}

interface Options extends ReactionCollectorOptions {
    filterForUser?: User | Snowflake
}

export function SimpleReactionCollector(
    message: Message,
    emoji: ReactionEmoji,
    functions: ObjectFunctions,
    options?: Options
): any

