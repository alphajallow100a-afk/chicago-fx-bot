const TelegramBot=require('node-telegram-bot-api');
const express=require('express');
const app=express();
const BOT_TOKEN=process.env.BOT_TOKEN;
const UNLOCK_CODE="CHICAGO2026";
const PRIVATE_INVITE="https://t.me/+CScVO";
const bot=new TelegramBot(BOT_TOKEN,{polling:true});
const users={};
console.log("Chicago FX Bot LIVE!");
bot.onText(/\/start/,(msg)=>{
bot.sendMessage(msg.chat.id,"👋 Welcome to CHICAGO FX BOT\n\nSend unlock code:\n/unlock CHICAGO2026");
});
bot.onText(/\/unlock (.+)/,(msg,match)=>{
const chatId=msg.chat.id;
const code=match[1].trim().toUpperCase();
if(code===UNLOCK_CODE){
users[chatId]={unlocked:true};
bot.sendMessage(chatId,`🔓 UNLOCKED!\n\nYour code: ${code}`);
bot.sendMessage(chatId,`🎬 WATCH METHOD HERE:\n${PRIVATE_INVITE}`);
bot.sendMessage(chatId,`✅ You're in! Type /start anytime`);
}else{
bot.sendMessage(chatId,"❌ Wrong code. Try: /unlock CHICAGO2026");
}
});
bot.onText(/\/status/,(msg)=>{
bot.sendMessage(msg.chat.id,"✅ Bot LIVE - Chicago FX Ready!");
});
app.get('/',(req,res)=>res.send('Bot is running'));
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>console.log(`Server on ${PORT}`));
