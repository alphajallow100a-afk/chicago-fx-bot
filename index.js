const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();
const BOT_TOKEN = process.env.BOT_TOKEN;
const UNLOCK_CODE = "CHICAGO2026";
const PRIVATE_INVITE = "https://t.me/+CScVOHnQOjFhY2Vk";
const bot = new TelegramBot(BOT_TOKEN, { polling: true });
const users = {};
console.log("Chicago FX Bot LIVE!");
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "🏙️ CHICAGO FX BOT\nWelcome Founder!\nPrice: $10 LIFETIME\n\nCommands:\n/unlock CHICAGO2026 - Unlock Private\n/status - Check bot");
});
bot.onText(/\/unlock (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const code = match[1].trim().toUpperCase();
  if (code === UNLOCK_CODE) {
    users[chatId] = { unlocked: true };
    bot.sendMessage(chatId, `✅ UNLOCKED! Welcome Founder! $10\n\n🔗 YOUR PRIVATE ACCESS:\n${PRIVATE_INVITE}\n\n👉 Tap link to join Chicago FX 100 Private\n\n🦁⚡ Welcome to the Family!`);
  } else {
    bot.sendMessage(chatId, "❌ Wrong code. Use: /unlock CHICAGO2026");
  }
});
bot.onText(/\/status/, (msg) => {
  bot.sendMessage(msg.chat.id, "✅ Bot LIVE - Chicago FX 100 Private Ready!");
});
app.get('/', (req, res) => res.send('Bot is running'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));
