const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: [
        new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Replies with Pong! and Latency')
            .addIntegerOption((option) =>
                option
                    .setName('good_ping')
                    .setDescription('What is good ping according to u?')
                    .setRequired(false)
            ),
        new SlashCommandBuilder()
            .setName('greet')
            .setDescription('Shows arguments given >:(')
            .addStringOption((option) =>
                option
                    .setName('name')
                    .setDescription('Enter ur name')

                    .setRequired(true),
            )
            .addStringOption((option) =>
                option
                    .setName('message')
                    .setDescription('Enter ur message')

                    .setRequired(true),
            ),
            new SlashCommandBuilder()
            .setName('credit')
            .setDescription('Shows Bot developer'),
            new SlashCommandBuilder()
            .setName('graph')
            .setDescription('Displays graph')
            .addStringOption((option) =>
                option
                    .setName('type')
                    .setDescription('Select type of graph')
                    .addChoices(
                        { name: 'Bar graph', value: 'bar' },
                        { name: 'Line graph', value: 'line' },
                        { name: 'Radar graph', value: 'radar' },
                        { name: 'Pie Graph', value: 'pie' },
                        { name: 'Radial', value: 'radialGauge' },
                    )
                    .setRequired(true)
            )
            .addStringOption((option) =>
                option
                    .setName('name')
                    .setDescription('Enter graph name')
                    .setRequired(true)
            )
            .addStringOption((option) =>
                option
                    .setName('labels')
                    .setDescription('Enter labels with spaces')
                    .setRequired(true)
            )
            .addStringOption((option) =>
                option
                    .setName('data')
                    .setDescription('Enter data with spaces')
                    .setRequired(true)
            ),
            new SlashCommandBuilder()
            .setName('help')
            .setDescription('Shows help menu'),
            new SlashCommandBuilder()
            .setName('warn')
            .setDescription('Warns a user')
            .addUserOption((option) =>
                option
                    .setName('user')
                    .setDescription('Select a user')
                    .setRequired(true)
            )
            .addStringOption((option) =>
                option
                    .setName('reason')
                    .setDescription('Enter reason')
                    .setRequired(true)
            )
            .addStringOption((option) =>
                option
                    .setName('message')
                    .setDescription('Enter reason')
                    .setRequired(true)
            ),
            new SlashCommandBuilder()
            .setName('getroles')
            .setDescription('Shows all roles'),
            new SlashCommandBuilder()
            .setName('embed')
            .setDescription('Creates embeds')
            .addStringOption((option) =>
                option
                    .setName('title')
                    .setDescription('Enter title')
                    .setRequired(true)
            )
            .addStringOption((option) =>
                option
                    .setName('desc')
                    .setDescription('Enter description')
                    .setRequired(true)
            ),
           

            

            

            
        
    ],


};
