import wweb from "whatsapp-web.js";
import qrcode from 'qrcode-terminal'
import cron from 'node-cron'

import data from './data.json'
import { numbers } from "./data";
import { getChar } from "./src/modules/rickAndMorty/getCharacter";

const dt = JSON.parse(JSON.stringify(data))

const {Client, LocalAuth, MessageMedia} = wweb

const bot = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-sexurity', '--disable-setuid-sandbox'],
        headless: true
    },
    webVersion: '2.2409.2',
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html'
    }
})

bot.on(ready, async() => {
    const media = MessageMedia.fromFilePath('./src/assets/images/pelota.png')
    await bot.sendMessage('@c.us', media, {sendMediaAsSticker: true})
    console.log('Iniciaste')
    console.log(dt)
})



bot.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

bot.on('message', async message => {

    const from = message.from
    const msj = message.body.toLowerCase()
    switch('from'){
        case `549${numbers.fran}@c.us`:
            const media = MessageMedia.fromFilePath('./src/assets/images/pelota.png') 
            await bot.sendMessage(from, media, {sendMediaAsSticker: true})
            break;

        default:
            await message.reply('A desconocidos no le respondo')
            break;

    }
})

var cron = require('node-cron');

cron.schedule('5 * * * *', () => {
 bot.sendMessage(`549${numbers}@c.us`, "Tengo ganas de molestar")
 bot.sendMessage(`549${numbers}@c.us`, media, {sendMediaAsSticker})
});



    if (from === "120363318106547962@g.us") {
        if (msj.includes("/personaje/")) {
            const { name, status, image } = await getChar(msj)
            console.log(name, status, image)
            const img = await MessageMedia.fromUrl("https://rickandmortyapi.com/api/character/avatar/4.jpeg")
            await bot.sendMessage('120363318106547962@g.us', img, { caption: `${name} - *${status}*` })
            await bot.sendMessage('120363318106547962@g.us', "pedime otro si querés")
        }
        // dead/morty
        if (msj.includes("dead/")) {
            const {pj_uno, pj_dos} = await deadChars(msj)
            const mdUno = await MessageMedia.fromUrl(pj_uno.image)
            const mdDos = await MessageMedia.fromUrl(pj_dos.image)
            await bot.sendMessage('120363318106547962@g.us', mdUno, { caption: `${pj_uno.name} - *${pj_uno.status}*` })
            await bot.sendMessage('120363318106547962@g.us', mdDos, { caption: `${pj_dos.name} - *${pj_dos.status}*` })
        }

        
    }

bot.initialize()