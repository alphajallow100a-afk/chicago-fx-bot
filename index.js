
});
bot.onText(/\/status/, (msg) => {
  bot.sendMessage(msg.chat.id, "✅ Bot LIVE - Chicago FX 100 Private Ready!");
});
app.get('/', (req, res) => res.send('Bot is running'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));
