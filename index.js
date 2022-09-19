
require('dotenv').config({path:'.env'});

const TelegramApi = require('node-telegram-bot-api');
const { send } = require('process');

const token = process.env.TELEGRAM_TOKEN_EDU;

const bot = new TelegramApi(token, {polling: true});

const chats = {} 

const rpsOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '✊🏻', callback_data: '✊🏻'}, {text: '✋🏻', callback_data: '✋🏻'}, {text: '✌🏻', callback_data: '✌🏻'}]
        ]
    })
};
const againOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'I wanna more', callback_data: '/again'}]
        ]
    })
};

bot.setMyCommands( [
        {command: '/start', description: 'ROCK! PAPER! SCISSORS!'},
    ]);

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Okey, let's start`);
        await bot.sendMessage(chatId, `3`);
        await bot.sendMessage(chatId, `2`);
        await bot.sendMessage(chatId, `1`);
        const rpsGenerate = () => {
            const randomGenerate = Math.ceil (Math.random() * 3);
            if (randomGenerate === 1) {
                return '✊🏻'
            } else if (randomGenerate === 2) {
                return '✋🏻'
            } else {
                return '✌🏻'
            }
            };

        chats[chatId] = rpsGenerate();
        
        await bot.sendMessage(chatId, 'choose', rpsOptions);
};   

start = () => {
    bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
        
    if (text === '/start') {
        return startGame(chatId) 
    }
    })
};

start();

bot.on('callback_query', msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    firstMessages = () => {
    bot.sendMessage(chatId, data);
    bot.sendMessage(chatId, chats[chatId]);
    }

    if (data == '✊🏻' && chats[chatId] == '✋🏻') {
        firstMessages();
        bot.sendMessage(chatId, 'HAHA! SUCKER!', againOptions) 
    };

    if (data == '✊🏻' && chats[chatId] == '✌🏻') {
        firstMessages();
        bot.sendMessage(chatId, 'damn, I lost', againOptions) 
    };

    if (data == '✋🏻' && chats[chatId] == '✊🏻') {
        firstMessages();
        bot.sendMessage(chatId, 'damn, I lost', againOptions) 
    };

    if (data == '✋🏻' && chats[chatId] == '✌🏻') {
        firstMessages();
        bot.sendMessage(chatId, 'HAHA! SUCKER!', againOptions) 
    };

    if (data == '✌🏻' && chats[chatId] == '✊🏻') {
        firstMessages();
        bot.sendMessage(chatId, 'HAHA! SUCKER!', againOptions) 
    };

    if (data == '✌🏻' && chats[chatId] == '✋🏻') {
        firstMessages();
        bot.sendMessage(chatId, 'damn, I lost', againOptions) 
    };

    if (data === chats[chatId]) {
        firstMessages();
        bot.sendMessage(chatId, `Same. let's try again`,againOptions)
    };

    if (data === '/again') {
        startGame(chatId)
    };

});

