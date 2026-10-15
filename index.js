const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();
const BOT_TOKEN = process.env.BOT_TOKEN;
const UNLOCK_CODE = "CHICAGO2026";
const bot = new TelegramBot(BOT_TOKEN, { polling: true });
const users = {};
console.log("Chicago FX Bot LIVE!");
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `🏙️ CHICAGO FX BOT\n\nWelcome!\nFounder: $10 LIFETIME\n\nUnlock: /unlock CHICAGO2026\n\nFree: /start /status`, { parse_mode: 'Markdown' });
});
bot.onText(/\/unlock (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const code = match[1].trim().toUpperCase();
  if (code === UNLOCK_CODE) {
    users[chatId] = { unlocked: true };
    bot.sendMessage(chatId, `✅ UNLOCKED! Welcome Founder! $10`);
  } else {
    bot.sendMessage(chatId, `❌ Wrong code. Use: /unlock CHICAGO2026`);
  }
});
bot.onText(/\/status/, (msg) => {
  const chatId = msg.chat.id;
  if (users[chatId]?.unlocked) {
    bot.sendMessage(chatId, `✅ STATUS: UNLOCKED`);
  } else {
    bot.sendMessage(chatId, `🔒 STATUS: LOCKED - Use /unlock CHICAGO2026`);
  }
});
app.get('/', (req, res) => res.send('Chicago FX Bot Running!'));
app.listen(3000, () => console.log('Server up'));
