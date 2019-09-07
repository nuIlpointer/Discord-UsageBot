const os = require("os");//サーバーマシン情報出力用
const osu = require("os-utils");//上に同じ
const Eris = require("Eris");

const erisToken = require("./settings.js")["bottoken"];
const command = require("./settings.js")["command"]
var client = new Eris(erisToken)

client.on("ready", () => {
    osu.cpuUsage(function(v){
      client.editStatus("online", {
        name: Math.floor(Number(v)*100) + " % CPU/" + (100 - (Math.floor(Math.floor(os.freemem() / 1048576) / Math.floor(os.totalmem() / 1048576) * 100))) + "% RAM USAGE",
        type: 0
      })
    });
});

client.on("messageCreate", (msg) => {
  if(msg.content == command) {
    osu.cpuUsage(function(v){
      client.createMessage(msg.channel.id, {
        embed: {
          title: "システムの状態",
          type: "rich",
          fields: [
            {
              name: "CPU名(1番目のコアの認識名)",
              value: os.cpus()[1].model
            },
            {
              name: "CPU コア数",
              value: os.cpus().length
            },
            {
              name: "CPU 使用率",
              value: "約" + Math.floor(Number(v)*100) + " %"
            },
            {
              name: "実装されているメモリー",
              value: Math.floor(os.totalmem() / 1048576) + "MB"
            },
            {
              name: "空きメモリー量",
              value: Math.floor(os.freemem() / 1048576) + "MB"
            },
            {
              name: "稼働時間(時)",
              value: `約${Math.floor(os.uptime() / 3600)}時間`
            }
          ]
        }
      });
    });
  }
})

const cron = require('node-cron');
cron.schedule("0 * * * * *", () => {
  osu.cpuUsage(function(v){
    client.editStatus("online", {
      name: Math.floor(Number(v)*100) + " % CPU/" + (100 - (Math.floor(Math.floor(os.freemem() / 1048576) / Math.floor(os.totalmem() / 1048576) * 100))) + "% RAM USAGE",
      type: 0
    })
  });
})
client.connect();
