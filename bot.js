const Discord=require('discord.js');
const Client=new Discord.Client();
const fs = require('fs');

Client.infofile = require("./Botinf.json");
Client.TOKEN = Client.infofile.token;
Client.prefix = Client.infofile.prefix;
Client.DS = Client.infofile.DefaultServer;
const DGuild = Client.guilds.find('id', Client.DS);



//Ready
Client.on('ready', () => {
    console.log("logged in as " + Client.user.tag +"\nReady to do stuff, master!");
    console.log("Current date: " + new Date().getDate() +  "." + (new Date().getMonth() + 1) +": " + new Date().getHours() + ":" + new Date().getMinutes());
    console.log("Default Server-Name: " + Client.guilds.find('id', Client.DS).name)
});



//Nachrichten
Client.on('message', msg => { 
    // msg.channel.send("Message detected!")
    if(msg.content.startsWith(Client.prefix)) {
        let args = msg.content.split(" ");
        Botcommands(args, msg);
    }
    if(msg.channel.guild) {
        if(msg.channel.guild.id != Client.DS) {
            Client.log();
        } 
    }
    else if(msg.channel) {

    }
    
});

Client.login(Client.TOKEN);



//oops :3


//Functions 
{
    function Botcommands(args, msg) {
        let cmd = args[1].toLowerCase();
        if(cmd == "set") {
            if(args[2] == "defaultserver") {
                Client.infofile.DefaultServer = args[2]
                jlog("./Botinf.json", Client.infofile);
                Client.infofile = require("./Botinf.json");
            } 
        }
        else if(cmd == "sendsplit") {
            let splitmessagearr
            if(args[3] == "spam##"){
                splitmessagearr = args.slice(2,args.length);
            } else {
                splitmessagearr = args.slice(3,args.length);
            }
            // console.log(splitmessagearr);
            let splitmessage = "";
            for(i in splitmessagearr) {
                splitmessage = splitmessage.concat(splitmessagearr[i]);
            }
            splitmessage = splitmessage.split("");
                if(args[2] != "spam##") {
                let finalmsg = ""
                // console.log(splitmessage.length)
                for(i in splitmessage) {
                    finalmsg = finalmsg.concat(splitmessage[i] + "\n");
                }
                // console.log(finalmsg)
                msg.channel.send(finalmsg);
            } else {
                for(i in splitmessage) {
                    msg.channel.send(splitmessage[i]);
                }
            }
        } else {
            console.log("[Error]: Something went wrong");
            let promise = msg.channel.send("[Error]: something went wrong!");
            promise.then(msg => {msg.delete(3000)})
        }
        msg.delete(500);
    }

    Client.log = function() {

    }

    function jlog(file, data) {
        fs.writeFileSync(file, JSON.stringify(data, null, 4), (err) => {
            if(err){
                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
                console.log('something went wrong!');                
                throw err;
            } else {
                console.log('-----------------------------------------')
                console.log('updated files!')
            }
        })
    }
}