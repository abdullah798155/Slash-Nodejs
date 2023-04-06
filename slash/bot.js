const { Client, GatewayIntentBits } = require('discord.js');
const { EmbedBuilder } = require('discord.js');


const { token, author, bot_name, prefix } = require('./config.json');
const { data } = require('./commands');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    ,
  ],
});

client.once('ready', async () => {
  console.log('Ready!');

  try {
    const commands = await client.application.commands.set(data);
    console.log(`${commands.size} slash command(s) registered.`);
  } catch (error) {
    console.error(error);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {

    console.log(`Ran by --> ${interaction.user.tag}`)
    const pinger = interaction.options.getInteger('good_ping');
    // await interaction.reply({ content: 'Pinging...', fetchReply: true });
    console.log(`Response Latency : ${interaction.client.ws.ping}`)
    let status = pinger >= interaction.client.ws.ping ? "Good Ping" : "Bad Ping"

    await interaction.reply(`${interaction.user.tag} \n Pong!\n:stopwatch: Uptime: \`${Math.round(interaction.client.uptime / 60000)} minutes\`\n :signal_strength: Latency: \`${interaction.client.ws.ping} ms\`\n ||${status}||`);



  } else if (interaction.commandName === 'greet') {
   
    console.log(`Ran by --> ${interaction.user.tag}`)
    const name = interaction.options.getString('name');
    const message = interaction.options.getString('message');
    // args=name.slice(0,name.length).trim().split(' ');
    await interaction.reply(`${interaction.user.tag}\nHello, ${name}! ${message}`);
    // await interaction.reply(args)

    console.log(`Response:\n`)
    console.log(`Name: ${name} --> Message: ${message}`)
  }
  else if (interaction.commandName === 'credit') {
    console.log(`Ran by --> ${interaction.user.tag}`)

    const exampleEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(`Made by ${author}`)

      .setAuthor({ name: 'Datablaze', iconURL: 'https://images-ext-1.discordapp.net/external/tYzRnigVRzn1u_XIDuvD0hDH7GsuDzp4bTiqxp68lnc/%3Fv%3D4%3Fs%3D400/https/avatars.githubusercontent.com/u/78679057?width=575&height=575' })
      .setDescription('Enjoy ! :)')
      // .setThumbnail('')
      // .addFields(
      //   { name: 'Regular field title', value: 'Some value here' },
      //   { name: '\u200B', value: '\u200B' },
      //   { name: 'Inline field title', value: 'Some value here', inline: true },
      //   { name: 'Inline field title', value: 'Some value here', inline: true },
      // )
      // .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
      .setImage('https://images-ext-1.discordapp.net/external/tYzRnigVRzn1u_XIDuvD0hDH7GsuDzp4bTiqxp68lnc/%3Fv%3D4%3Fs%3D400/https/avatars.githubusercontent.com/u/78679057?width=575&height=575')
      .setTimestamp()
    // .setFooter({ text: 'Enjoy', iconURL: '' });

    interaction.reply({ embeds: [exampleEmbed] });

  }
  else if (interaction.commandName === 'graph') {
    console.log(`Ran by --> ${interaction.user.tag}`)
    const type_g = interaction.options.getString('type')
    const gr_name = interaction.options.getString('name');
    const lab = interaction.options.getString('labels');
    const dat = interaction.options.getString('data');
    args_lab = lab.slice(0, lab.length).trim().split(' ');
    args_dat = dat.slice(0, dat.length).trim().split(' ');
    args_data = []
    let k = 0
    for (x in args_dat) {
      args_data[k] = Number(args_dat[x]);
      k++;
    }
    const chart = {
      type: type_g,
      data: {
        labels: args_lab,
        datasets: [
          {
            label: gr_name,
            data: args_data,

          },
        ],
      },
      options: {
        plugins: {
          backgroundImageUrl: 'https://wallpaperaccess.com/full/1588284.jpg',
        }
      }
    };
    const encodedChart = encodeURIComponent(JSON.stringify(chart));
    const chartUrl = `https://quickchart.io/chart?c=${encodedChart}`;
    console.log(chart)
    console.log(chart.data.datasets[0])
    await interaction.reply(chartUrl)

  }
  else if (interaction.commandName === 'help') {
    console.log(`Ran by --> ${interaction.user.tag}`)
    const exampleEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(`Help for ${bot_name}`)

      .setAuthor({ name: 'Datablaze', iconURL: 'https://images-ext-1.discordapp.net/external/tYzRnigVRzn1u_XIDuvD0hDH7GsuDzp4bTiqxp68lnc/%3Fv%3D4%3Fs%3D400/https/avatars.githubusercontent.com/u/78679057?width=575&height=575' })
      .setDescription(`Prefix: ${prefix} \n\nCommands: \n`)
      // .setThumbnail('')
      .addFields(
        { name: 'Ping', value: 'Check your ping' },
        // { name: '\u200B', value: '\u200B' },
        { name: 'Greet', value: 'Greet someone' },
        { name: 'Graph', value: 'Make a graph' },
        { name: 'Credit', value: 'Shows bot developer' },
      )
      // .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
      // .setImage('https://images-ext-1.discordapp.net/external/tYzRnigVRzn1u_XIDuvD0hDH7GsuDzp4bTiqxp68lnc/%3Fv%3D4%3Fs%3D400/https/avatars.githubusercontent.com/u/78679057?width=575&height=575')
      .setTimestamp()
    // .setFooter({ text: 'Enjoy', iconURL: '' });

    interaction.reply({ embeds: [exampleEmbed] });
  }
  else if (interaction.commandName === 'warn') {
    let rolName = ""
    let f = 0
    let rol = interaction.member.roles.cache.some(r => {
      r.name === "owner"
      r.name === "owner" ? rolName = r.name : f = 1
    })

    if (interaction.member.roles.cache.some(r => ["owner"].includes(r.name)

    )) {

      const user = interaction.options.getUser('user');
      //  const role = interaction.options.getRole('role');
      const reason = interaction.options.getString('reason');
      //  const channel = interaction.options.getChannel('channel');
      console.log(`He has the role ${rolName}`)

      const message = interaction.options.getString('message');
      const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`Warning for ${user.tag}`)
        .setTimestamp()
        .addFields(
          { name: 'Reason', value: reason },
          { name: 'Message', value: message },
        )
        .setFooter({ text: `Warned by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL() });
      interaction.reply({ embeds: [exampleEmbed] });
    }
    else {
      interaction.reply("You don't have the permission to use this command")
    }



  }
  else if (interaction.commandName === 'getroles') {
    const member = interaction.member;
    let f=0

    // check if the member object exists
    if (member) {
      // get an array of role names for the member
      let arr=[]
      let h=0
      const roleNames = member.roles.cache.map(role => role.id);
      
      for (x in roleNames) {
        roleNames[x]!='924613620401332234'?arr[h]=`<@&${roleNames[x]}>`:f=1;
        h++
      }
      interaction.reply(`Your roles: ${arr}`);

      
    }
  }
  else if (interaction.commandName === 'embed') {
    
    const title = interaction.options.getString('title');
    const desc = interaction.options.getString('desc');
    
  
    const exampleEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(title)
      .setDescription(desc)
      .setTimestamp()
      .setFooter({ text: `Created by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL() });

      interaction.reply({ embeds: [exampleEmbed] });
    

  }

});



client.login(token);
