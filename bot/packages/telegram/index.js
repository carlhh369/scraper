import TelegramBot from 'node-telegram-bot-api';
import request from './utils/request.js'

// Replace 'YOUR_BOT_TOKEN' with the token from BotFather
const token = `7926431835:AAEjbScqFyl9W6Qu907xOfoGkZ8EKFpvJgM`
const bot = new TelegramBot(token, { polling: true });

// Listen for any message
bot.on('message', (msg) => {
    console.log('on message====', JSON.stringify(msg, null, 2))
    const chatId = msg.chat.id;
    const messageText = msg.text;
    const username = msg.from.username || 'Anonymous';
    const userId = msg.from.id;

    request({
        url: '/api/add_message',
        data: {
            "group_id": chatId,
            "user_id": userId,
            "username": username,
            "message": messageText
        }
    })
});

// Error handling
bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
});

console.log('Bot is running...');