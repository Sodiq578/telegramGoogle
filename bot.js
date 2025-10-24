const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const app = express();
const port = 3000;

// Telegram bot sozlamalari
const token = '7978359844:AAH_su2pm1WJQZuzSjkNsu8BRo-cemtvKgg';
const bot = new TelegramBot(token, { polling: true });

// Statik fayllarni (HTML, CSS, JS) taqdim etish
app.use(express.static('public'));

// JSON va form ma'lumotlarini qabul qilish
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rasm qabul qilish va Telegram botiga yuborish
app.post('/upload-image', (req, res) => {
    const imageData = req.body.image;
    // Base64 dan rasmni botga yuborish
    const buffer = Buffer.from(imageData.replace(/^data:image\/png;base64,/, ''), 'base64');
    
    // Telegram bot orqali rasm yuborish (sizning chat ID ni qo'yishingiz kerak)
    bot.sendPhoto('7412640853', buffer)
        .then(() => {
            res.json({ status: 'success', message: 'Rasm botga yuborildi!' });
        })
        .catch((error) => {
            console.error(error);
            res.json({ status: 'error', message: 'Xatolik yuz berdi!' });
        });
});

// Serverni ishga tushirish
app.listen(port, () => {
    console.log(`Server http://localhost:${port} da ishlamoqda`);
});