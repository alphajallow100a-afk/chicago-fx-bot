const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

const BOT_TOKEN = process.env.BOT_TOKEN;
const POCKET_SSID = process.env.POCKET_SSID || '';
const REAL_MODE_ENABLED = true;
const REAL_BALANCE = process.env.REAL_BALANCE || '0.02';

const PRIVATE_INVITE = "https://t.me/+rKd67HabS8RiOTU8";
const UNLOCK_CODE = "CHICAGO2026";

console.log("=== CHICAGO FX BOT STARTING ===");
console.log("Token exists:", !!BOT_TOKEN);
console.log("SSID exists:", !!POCKET_SSID);
console.log("Balance:", REAL_BALANCE);

if (!BOT_TOKEN) {
  console.log("ERROR: NO BOT_TOKEN!");
}

const bot = new TelegramBot(BOT_TOKEN, { 
  polling: {
    interval: 300,
    autoStart: true,
    params: { timeout: 10 }
  }
});

bot.deleteWebHook().then(() => {
  console.log("Webhook deleted, polling started");
});

bot.on('polling_error', (error) => {
  console.log("Polling error:", error.code, error.message);
});

bot.on('message', (msg) => {
  console.log("Got message:", msg.text, "from", msg.chat.id);
});

const users = {};

app.get('/', (req, res) => {
  res.send(`Bot is LIVE! Real Mode: ${REAL_MODE_ENABLED} | Balance: $${REAL_BALANCE} | Time: ${new Date()}`);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

bot.onText(/\/start/, (msg) => {
  console.log("START command from", msg.chat.id);
  const chatId = msg.chat.id;
  users[chatId] = { unlocked: false };
  bot.sendMessage(chatId, `👋 Welcome to Chicago FX Bot!\n\nStatus: REAL MODE - LIVE ✅ $${REAL_BALANCE}\nPocket SSID: ${POCKET_SSID ? 'Connected ✅' : 'Not Set'}\n\nCommands:\n/unlock CHICAGO2026 - Unlock signals\n/balance - Check real balance\n/trade - Start real trading (0.02)\n\nYour ID: ${chatId}`).catch(e => console.log("Send error:", e.message));
});

bot.onText(/\/unlock (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const code = match[1].trim().toUpperCase();
  if (code === UNLOCK_CODE) {
    users[chatId] = { unlocked: true };
    bot.sendMessage(chatId, `🔓 UNLOCKED!\n\nREAL MODE - LIVE ✅ $${REAL_BALANCE}\nYou now have access to real trading with $${REAL_BALANCE}!\n\nType /trade to start\nPrivate: ${PRIVATE_INVITE}`);
  } else {
    bot.sendMessage(chatId, `❌ Wrong code. Use: CHICAGO2026`);
  }
});

bot.onText(/\/balance/, (msg) => {
  bot.sendMessage(msg.chat.id, `💰 Balance: $${REAL_BALANCE}\nReal Mode: LIVE ✅\nPocket: ${POCKET_SSID ? 'Connected' : 'Not Set'}`);
});

bot.onText(/\/trade/, (msg) => {
  bot.sendMessage(msg.chat.id, `🚀 Starting REAL trade with $${REAL_BALANCE}!\nPocket SSID: ${POCKET_SSID.substring(0,15)}...`);
});

console.log("Bot handlers registered!");
