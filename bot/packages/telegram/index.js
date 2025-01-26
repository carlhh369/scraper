const TelegramBot = require('node-telegram-bot-api');
const request = require('./utils/request.js')

// Replace 'YOUR_BOT_TOKEN' with the token from BotFather
const token = process.env.TELEGRAM_BOT_TOKEN
const bot = new TelegramBot(token, { polling: true });

// Listen for any message
bot.on('message', async (msg) => {
    console.log('on message====', JSON.stringify(msg, null, 2))
    const chatId = msg.chat.id;
    const messageText = msg.text;
    const username = msg.from.username || 'Anonymous';
    const userId = msg.from.id;
    try {
        request({
            url: '/api/add_message',
            data: {
                "group_id": chatId,
                "user_id": userId,
                "username": username,
                "message": messageText
            }
        })
    } catch (error) {
        console.error('request error====', error)
    }
});

// Error handling
bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
});

console.log('Bot is running...');