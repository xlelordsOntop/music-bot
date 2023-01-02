const { Discord, Client, Intents, Collection, MessageEmbed, MessageButton, MessageActionRow, Interaction, ClientVoiceManager, Role } = require("discord.js");
const { prefix } = require("./config.json")
const db = require("quick.db");
const glob = require('glob');
const fs = require('fs');
const express = require('express');
const app = express();
const { AutoKill } = require('autokill')
const colors = require("colors")

const client = new Client({ 
    intents: 32767,
  }); 

AutoKill({Client: client, Time: 5000})

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

 


  const Timeout = new Set();
  const ms = require('ms');
  client.commands = new Collection();
  client.aliases = new Collection();
  
  ["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
  });

client.on("ready", async () => {
	 console.log(`[${colors.green('API')}] ✅ | <${colors.bgGreen(`Launched Successfully.`)}>`);
 console.log(`\n============================================================`);
 console.log(`[${colors.green('SERVER')}] ✅ | <${colors.red(`Bot Is Now Online`)}>`);
 console.log(`\n============================================================`);
  client.user.setActivity(`c!help` , { type: 'WATCHING' })
});

  client.on("ready", async () => {
  client.user.setActivity(`${prefix}help` , { type: 'WATCHING' })
});

client.on("ready", async () => {
  client.user.setStatus(`dnd`)
});

client.on("messageCreate", async message => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
   
  
   
    if (!message.member) message.member = await message.guild.fetchMember(message);
  
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
   const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
  
    let command = client.commands.get(cmd);
      if (!command) command = client.commands.get(client.aliases.get(cmd));
      if (command.disable) {
        message.reply(`\`\`\`This Command Has been Disabled!\`\`\``)
      }
  
  
    if (!command) command = client.commands.get(client.aliases.get(cmd));

	  if (command.premium) {
		const embed = new MessageEmbed()
		.setColor(`RANDOM`)
			.setTitle(`⭐ • Premium Warning`)
		 .setDescription(`>>> \`\`\`yaml\n ⭐ • This Command Is Blacklisted For Premium Members\`\`\``)
		.setFooter(`How To Get Premium • Join The Support Server`)
		
    let users = await db.fetch(`premium_${message.author.id}`);
		
    if (!users) {
      return message.channel.send({embeds: [embed]})
	}
	}
      
      if (command.timeout) {
        if (Timeout.has(`${message.author.id}${command.name}`)) {
          let timecommand = ms(command.timeout) / 1000
          let embed = new MessageEmbed()
          .setColor("RED")
          .setTitle(`**Slow Down, Your Using This Command To Much Please Wait**`)
          .addField(`⌚ • Time:`, `\`\`\`${timecommand}\`\`\``)
          return message.reply({embeds: [embed]})
        } else {
          command.run(client, message, args);
          Timeout.add(`${message.author.id}${command.name}`)
          setTimeout(() => {
            Timeout.delete(`${message.author.id}${command.name}`)
          }, command.timeout);
        }
      } else {
        command.run(client, message, args)
      }
  });


client.on('message', message => {
  let ctx = db.fetch(`antiDiscord_${message.guild.id}`);

    if (ctx === null) return;
    if (message.content.includes("https//discord.gg/")) {
      message.delete();
}
      if (message.content.includes("http://discord.gg/")) {
        message.delete();
}

if (message.content.includes("discord.gg/")) {
  message.delete();
}
if (message.content.includes("discord.gg")) {
  message.delete();
}
})




 process.on('multipleResolves', (type, promise, reason) => { // Needed
 console.log(`[${colors.green('antiCrash')}]  <${colors.red(`[unhandledRejection]`)}>`);
console.log(`\n============================================================`);
    console.log(type, promise, reason);
  });
  process.on('unhandledRejection', (reason, promise) => { // Needed
    console.log('[antiCrash] :: [unhandledRejection]');
 console.log(`[${colors.green('antiCrash')}]  <${colors.red(`[unhandledRejection]`)}>`);
console.log(`\n============================================================`);
    console.log(promise, reason);
  });
  process.on("uncaughtException", (err, origin) => { // Needed
   cconsole.log(`[${colors.green('antiCrash')}]  <${colors.red(`[unhandledRejection]`)}>`);
console.log(`\n============================================================`);
    console.log(err, origin);
  });
  process.on('uncaughtExceptionMonitor', (err, origin) => { // Needed
console.log(`[${colors.green('antiCrash')}]  <${colors.red(`[unhandledRejection]`)}>`);
console.log(`\n============================================================`);

    console.log(err, origin);
  });





  client.login(`OTc3ODA2NDIwOTAyODM4Mjgy.GHf0Ui.E5OJftXCUQO2Ku5m0J5SBQaFfNseSGOj8cjexc`)