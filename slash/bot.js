const { Client, GatewayIntentBits } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'XXXXXXXXX',
  user: 'XXXXXXXXXXX',
  password: 'XXXXXXXXXX',
  database: 'XXXXXXXXXXX'
});

require('dotenv').config();

const token = process.env.TOKEN;



const {  author, bot_name, prefix,lang,package } = require('./config.json');
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

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    try {
      const commands = await client.application.commands.set(data);
      console.log(`${commands.size} slash command(s) registered.`);
    } catch (error) {
      console.error(error);
    }
    connection.connect((err) => {
      if (err) throw err;
      console.log('Connected to MySQL!');
      
    });
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
    .setFooter({ text: `Made with ${lang}--${package}`, iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQju-vgVTmpkVyDPKqMTKTZTZI-usr9qh2vacUgxp-HUB5Zyz2C82G5hraSt1d1FAyd6ZY&usqp=CAU' });

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
      const reason = interaction.options.getString('reason');
      connection.query("Create table if not exists wa(name varchar(30), reason varchar(30))"
    , (err, result) => {
        if (err) throw err;
        console.log('Table created!');
      });
    connection.query(`INSERT INTO wa VALUES ('${user}', '${reason}')`, (err, result) => {
        if (err) throw err;
        console.log('Row inserted!');
      });
    // message.reply("hello")
      
    connection.query(`SELECT * FROM wa where name='${user}'`, (err, rows) => {
      if (err) throw err;
      console.log('Data received from MySQL:\n');
      let s="";
      for(x in rows){
        s+="`User`: "+rows[x].name+" `Reason`: "+rows[x].reason+"\n";

      }
        connection.query(`select count(*) as count from wa where name='${user}'`, async(err, rows) => {
      console.log(rows[0].count);
          const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle("Warning :warning:")
        .setDescription(`\`Warning for ${user.tag} | No. of Warnings: ${rows[0].count}\``)
        .setTimestamp()
        .addFields(
          { name: 'Reason', value: reason },
          {name:'previuos warnings',value:s}
        )
        .setFooter({ text: `Warned by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL() });
        await interaction.reply({ content: `${user}`, fetchReply: true });
      interaction.editReply({ embeds: [exampleEmbed]});
       
    })
        
     
      

      // message.reply();
    });}
    else{
      interaction.reply("You don't have permission to warn others")
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
        roleNames[x]!='980518130495402095'?arr[h]=`<@&${roleNames[x]}>`:f=1;
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
