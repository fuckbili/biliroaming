const TelegramBot = require('node-telegram-bot-api');
const config = require('./config/config')
const model = require('./config/model')
const sql = require('./config/sql')
const token = config.botToken;

const bot = new TelegramBot(token, {
    polling: true
});

bot.onText(/\/black (.+)/, async (msg, match) => {
    try {
        const formId= msg.from.id;
        const chatId=msg.chat.id;
        const resp = match[1];
        switch (isNaN(resp)) {
            case false:
                admin = await model.check_admin(formId)
                switch (admin) {
                    case true:
                        data = await model.check_white(resp)
                        return bot.sendMessage(chatId, data);
                    case false:
                        return bot.sendMessage(chatId, '不是狗管理，别瞎几把动');
                }
                case true:
                    return bot.sendMessage(chatId, '请输入正确格式,如/black 12345');
        }

    } catch (error) {
        return bot.sendMessage(chatId, '机器人错误');
    }
});
bot.onText(/\/del (.+)/, async (msg, match) => {
    try {
        const formId= msg.from.id;
        const chatId=msg.chat.id;
        const resp = match[1];
        switch (isNaN(resp)) {
            case false:
                admin = await model.check_admin(formId)
                switch (admin) {
                    case true:
                        data = await model.check_black(resp)
                        return bot.sendMessage(chatId, data);
                    case false:
                        return bot.sendMessage(chatId, '非狗管理,爬');
                }
                case true:
                    return bot.sendMessage(chatId, '请输入正确格式,如/del 12345');

        }
    } catch (error) {
        return bot.sendMessage(chatId, '机器人错误');
    }
});

bot.onText(/\/start/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        return bot.sendMessage(chatId, 'hello,By:mk39');
    } catch (error) {
        return bot.sendMessage(chatId, '机器人错误');
    }
});