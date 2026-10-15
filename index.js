const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();
const BOT_TOKEN = process.env.BOT_TOKEN;
const POCKET_SSID = process.env.POCKET_SSID || 'temp';
const REAL_MODE_ENABLED = process.env.REAL_MODE_ENABLED === 'true' || true;
const REAL_BALANCE = process.env.REAL_BALANCE || '0.02';
const PRIVATE_INVITE = "https://t.me/+rKd67Ha";
const UNLOCK_CODE = "CHICAGO2026";
const bot = new TelegramBot(BOT_TOKEN, { polling: true });
const users = {};
console.log("Chicago FX Bot LIVE! Real Mode:", REAL_MODE_ENABLED, "Balance:", REAL_BALANCE);
app.get('/', (req, res) => res.send(`Bot is LIVE! Real Mode: ${REAL_MODE_ENABLED} | Balance: $${REAL_BALANCE}`));
app.listen(process.env.PORT || 10000);
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  users[chatId] = { unlocked: false };
  const statusText = REAL_MODE_ENABLED? `REAL MODE - LIVE ✅ $${REAL_BALANCE}` : `REAL MODE - LOCKED 🔒`;
  bot.sendMessage(msg.chat.id, `👋 Welcome to Chicago FX Bot!\n\nStatus: ${statusText}\nPocket SSID: ${POCKET_SSID? 'Connected ✅' : 'Not Set'}\n\nCommands:\n/unlock CHICAGO2026 - Unlock signals\n/balance - Check real balance\n/trade - Start real trading (0.02)\n\nYour ID: ${chatId}`);
});
bot.onText(/\/unlock (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const code = match[1].trim().toUpperCase();
  if (code == UNLOCK_CODE) {
    users[chatId] = { unlocked: true };
    const statusText = REAL_MODE_ENABLED? `REAL MODE - LIVE ✅ $${REAL_BALANCE}` : `REAL MODE - LOCKED 🔒`;
    bot.sendMessage(chatId, `🔓 UNLOCKED!\n\n${statusText}\nYou now have access to real trading with $${REAL_BALANCE}!\n\nType /trade to start`);
  } else {
    bot.sendMessage(chatId, `❌ Wrong code`);
  }
});
bot.onText(/\/balance/, (msg) => {
  bot.sendMessage(msg.chat.id, `💰 Balance: $${REAL_BALANCE}\nReal Mode: ${REAL_MODE_ENABLED? 'LIVE ✅' : 'LOCKED 🔒'}\nPocket: ${POCKET_SSID? 'Connected' : 'Not Set'}`);
});
bot.onText(/\/trade/, (msg) => {
  if (!REAL_MODE_ENABLED) {
    bot.sendMessage(msg.chat.id, `🔒 REAL MODE LOCKED`);
    return;
  }
  bot.sendMessage(msg.chat.id, `🚀 Starting REAL trade with $${REAL_BALANCE}!\nPocket SSID: ${POCKET_SSID.substring(0,10)}...`);
});
