import { BaseCommandInteraction, Client, ClientUser, MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Constants } from '../lib/constants';

export = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction: any, client: Client) {
        interaction.reply({
            content: `${Constants['Emojis'].LOADING} Pinging...`
        });
        const pingEmbed = new MessageEmbed()
            .setColor(Constants.Colors.DEFAULT)
            .setAuthor({ name: 'Ping!' })
            .setDescription('Client, and Websocket Ping.')
            .addFields(
                {
                    name: `${Constants['Emojis'].CONNECTION} Client Ping`,
                    value:
                        '```> ' +
                        `${Date.now() - interaction.createdTimestamp}.00ms` +
                        '```',
                    inline: true,
                },
                {
                    name: `${Constants['Emojis'].CONNECTION} API Ping`,
                    value:
                        '```> ' + `${Math.round(client.ws.ping)}.00ms` + '```',
                    inline: true,
                },
            );
        await interaction.deleteReply();
        await interaction.channel.send({ embeds: [pingEmbed], ephemeral: true });
    },
};
