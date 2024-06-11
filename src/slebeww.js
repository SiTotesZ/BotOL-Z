const home = (path) => __base + path

require('./options/settings')
const {
    BufferJSON,
    WA_DEFAULT_EPHEMERAL,
    generateWAMessageFromContent,
    proto,
    generateWAMessageContent,
    generateWAMessage,
    prepareWAMessageMedia,
    areJidsSameUser,
    getContentType
} = require('@whiskeysockets/baileys')


const {
    toAudio,
    toPTT
} = require(home('./lib/converter'))

const fs = require('fs');
const util = require('util');
const moment = require('moment-timezone');
const {
    getBuffer,
    hitungmundur,
    bytesToSize,
    checkBandwidth,
    runtime,
    fetchJson,
    getGroupAdmins,
    msToDate,
    isUrl,
    tanggal,
    smsg,
    turudek
} = require(home('./lib/sitotesFunc'))
const {
    client
} = require(home('./lib/dbmongosle'))
const {
    TelegraPh
} = require(home('./lib/uploader'))

const lang = require('./options/lang_id')
// const svdata = () => fs.writeFileSync(home(`./src/.sitotes/data/database.json`), JSON.stringify(global.db, null, 2))


module.exports = onic = async (onic, m, chatUpdate, mek, store) => {
    try {
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : '' //omzee
        var budy = (typeof m.text == 'string' ? m.text : '')
        var isCmd = /^[°•π÷×¶∆£¢€¥®™�✓_=|~!?#/$%^&.+-,\\\©^]/.test(body)
        // const isCmd = /≈/.test(body)
        const prefix = isCmd ? budy[0] : ''
        var command = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : ''
        var cimmind = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : body.trim().split(' ').shift().toLowerCase()
        var args = body.trim().split(/ +/).slice(1)
        const pushname = m.pushName || "No Name"
        const botNumber = await onic.decodeJid(onic.user.id)
        const tanggal = moment().tz("Asia/Makassar").format("dddd, ll")
        const jam = moment(Date.now()).tz('Asia/Makassar').locale('id').format('HH:mm:ss z')
        const salam = moment(Date.now()).tz("Asia/Makassar").locale('id').format('a')
        const isCreator = [botNumber, ...global.ownno].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        var text = q = args.join(" ")
        const quoted = m.quoted ? m.quoted : m
        const from = m.chat
        const mime = (quoted.msg || quoted).mimetype || ''
        const isMedia = /image|video|sticker|audio/.test(mime)
        const groupMetadata = m.isGroup ? await onic.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
        const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss z')
        const timestamp = m.messageTimestamp
        
        const currentTime = new Date();
        const currentHour = currentTime.getHours();

        

        const reply = onic.reply
        const replyEmo = onic.replyEmo
        const react = onic.react
        const presence = onic.presence
        
        const casee = (lib) => './commands/' + lib
        const runCase = async (runto, perfic = true) => {
            if (perfic) {
                if (isCmd) require(casee(runto))(onic, m, command, mek, store)
            } else {
                if (!isCmd) require(casee(runto))(onic, m, cimmind, mek, store)
            }

        }
        const checkcid = async (dataapa, chatny, jalok, runto) => {
            for (let i = 0; i < chatny.length; i++) {
                var ver = dataapa[chatny[i]] ? dataapa[chatny[i]] : false
                ver = ver[m.chat] ? ver[m.chat] : 'emanf eak'
                if (m.quoted) {
                    if (!isCmd) {
                        if (ver[jalok] == m.quoted.id) {
                            require(casee(runto))(onic, m, command, mek, store)
                        }
                    }
                }
            }
        }

       
        console.log(
            ' \n|=| MSG |-> ',
            ` ${moment(timestamp * 1000).format(`HH:mm: s`) + ' | ' + ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu', 'Minggu'][Number(moment(timestamp * 1000).format(`E`))] + ', ' + moment(timestamp * 1000).format(`DD MMMM y`)} --> fromMe (${m.key.fromMe}) `,
            `\n ${budy || m.mtype} `,
            `\n |=> ${m.sender} -> ( ${pushname} ) `,
            `\n |=> `, m.isGroup ? groupName : 'Private Chat', m.chat
        )
        if (__base.includes('/data/data/com.termux/')) return console.log
        
        // const msgFilter = require(home('./lib/antispam'));
        // if (!isCreator && !m.key.fromMe && isCmd && msgFilter.isFiltered(m.sender)) {
        //     console.log('[ SPAM ]', (new Date), budy || m.mtype + '\n' + '=> Dari', pushname, m.sender + '\n' + '=> Di', m.isGroup ? pushname : 'Private Chat', m.chat)
        //     await reply('Jangan spam, Tunggu 3 detik!!!')
        //     return
        // }
        if (isCmd) msgFilter.addFilter(m.sender)

        if (m.message) {
            await turudek(1)
            await onic.readMessages([m.key])
        }
        
        const mdb = await onic.mdbConnectDb('users')
        let users = await mdb.findOne({ nomer: m.sender })
        
        if(!users){
            await mdb.insertOne({
                nomer: m.sender
            })
            users = await mdb.findOne({ nomer: m.sender })
        }
        
        //setelah satu hari berlangsung, maka akan di masukan ke function ini
        if (!m.isGroup && !m.key.fromMe && m.message && !(new Date - users.pc < 86400000)) {
            let greetingsChat = '\nHai 🍩'
            if (currentHour < 4) {
                greetingsChat = '\nMalam 🌃';
            } else if (currentHour < 11) {
                greetingsChat = '\nPagi 🌄';
            } else if (currentHour < 15) {
                greetingsChat = '\nSiang 🏖️';
            } else if (currentHour < 19) {
                greetingsChat = '\nSore 🌅';
            } else {
                greetingsChat = '\nMalam 🌌';
            }
            await onic.sendPesan(m.chat, {
                text: `${greetingsChat}, *${pushname}*!\nSelamat datang di Bot Asisten!\n\nSaya, SiTotes Bot, Diciptakan Oleh     ${"```m.saiful.anam.r.```"}\n\nAyo mulai petualanganmu dengan mengetik *#menu*. Stay awesome! 🚀`,
                contextInfo: {
                    externalAdReply: {
                        title: 'Selamat ' + salam + ' ' + pushname,
                        body: '© ' + ownername,
                        thumbnail: logo,
                        sourceUrl: myweb,
                        mediaUrl: '',
                        renderLargerThumbnail: true,
                        showAdAttribution: true,
                        mediaType: 1
                    }
                }
            })
            await onic.sendPoll(m.chat, 'Pilih menu untuk menulai, atau Pilih Owner untuk menghubungi pemilik / pembuat bot', ['Menu / Feature','Owner / Pembuat', 'Status Bot?'] )
            await mdb.updateOne({ nomer: m.sender }, { $set: { pc: new Date * 1, name: pushname } })
        }
        
        
        
        
        

        if (m.quoted && m.quoted.text.includes('(#)')) {
            const sfg = m.quoted.text
            const uus = parseInt(budy)

            //(#€) tambahkan ini jika ingin reques nomer
            if (sfg.includes('(#€)'))
                if (uus == 0) {
                    return await reply('List dimulai dari angka 1')
                } else if (!uus) return await reply('Hanya angka kak, contoh reply list lalu ketik 1')

            const regex = /🍂:\s(.*?)\*\n/g;
            const regexx = /🍂:\s(.*?)\*\n📎:\s(.*?)\n/g;
            const regexxx = /🍂:\s(.*?)\*\n\*🍀:\s(.*?)\*\n📎:\s(.*?)\n/g;
            const cmdss = m.quoted.text.match(/\(#\)(\w+)/)[1]
            let i = 1;
            let matchh;

            while ((matchh = regexxx.exec(sfg) || regexx.exec(sfg) || regex.exec(sfg)) !== null) {
                const judul = matchh[1] || matchh[2] || matchh[3];
                const textr = matchh[3] || matchh[2] || matchh[1];

                if (i === uus) {
                    command = cmdss;
                    cimmind = cmdss;
                    m.text = `#${cmdss} ${textr}|•||•|${judul}`;
                    m.body = `#${cmdss} ${textr}|•||•|${judul}`;
                    m.msg.text = `#${cmdss} ${textr}|•||•|${judul}`;
                    body = `#${cmdss} ${textr}|•||•|${judul}`;
                    isCmd = /^[°•π÷×¶∆£¢€¥®™�✓_=|~!?#/$%^&.+-,\\\©^]/.test(body);
                    args = body.trim().split(/ +/).slice(1);
                    text = q = args.join(" ");
                    console.log(body)

                    break;
                }

                i++;
            }

            if (i < uus) {
                await reply("Nomor video tidak valid.");
            }
        }

        /*
        if(!m.isGroup && !isCmd) {
            await onic.sendPresenceUpdate('composing', m.chat)
            const jawbn = await onic.axiosUrlToJson(`https://tiktod.eu.org/ai?system=Your+Name+is+Nakano&question=${m.text}`)
            await react('🐣')
            if(!jawbn.result){
                await react('🤯')
                await reply('SiTotes Error nihh, Tanya Owner Yu\n\n'+JSON.stringify(jawbn ,null , 2))
                return await onic.sendPresenceUpdate('available', m.chat)
            }
            // await react('✈️')
            await reply(jawbn.result+'\n\n©m.saiful.anam.r → AI')
            await react('')
            await onic.sendPresenceUpdate('available', m.chat)
        }
        */
        
        
        
        
        

        switch (m.isGroup?command:cimmind) {
            case 'u':
            case 'test':
            case 'status':
            case 'p':
            case 'Runtime':
            case 'Uptime': {
                await reply(`Halo Saya Bot SiTotes, server saya terakhir restart ( ${runtime(process.uptime())} ) yang lalu`)
            }
            break
            case 'owner':
            case 'pembuat':
            case 'creator': {
                await onic.sendContact(m.chat, ['6288989781626', '6285176916306'], ['ꈍ Owner Bot', 'ꈍ Bot'], [`item1.EMAIL;type=INTERNET: si.totes.ofc@gmail.com\nitem1.X-ABLabel:Gmail\n\nitem2.ADR:;;@m.saiful.anam.r;@si.totes;\nitem2.X-ABLabel:instagrams`, ''], m)
            }
            break

        }

        async function swicherCommand(alokk) {
            
            // switch (false){
            switch (alokk) {
                case '*':
                case '×':
                case '🌟': {
                    if(!quoted) return
                    await onic.sendMessageJson(onic.user.id, (quoted.msg || quoted).fakeObj)
                }
                break
                case 'send': {
                    if(!quoted) return
                    if(!text) return
                    await onic.sendMessageJson(text.replaceAll('https://', ''), (quoted.msg || quoted).fakeObj)
                }
                break
                case 'onc': {
                    if (!quoted) return await reply('Tidak mereply apapun, reply media')
                    await onic.sendReaction(m.chat, m.key, '🦶')
                    let vnot = (quoted.msg || quoted).fakeObj
                    vnot.message[m.quoted.mtype].viewOnce = true
                    await onic.sendMessageJson(m.chat, vnot)
                }
                case '2x': {
                    if (!quoted) return await reply('Tidak mereply apapun, reply media')
                    await onic.sendReaction(m.chat, m.key, '🦶')
                    let vnot = (quoted.msg || quoted).fakeObj
                    let so = (m.quoted.mtype == 'viewOnceMessageV2Extension'||'viewOnceMessageV2'||'viewOnceMessage' ? vnot.message[m.quoted.mtype].message[getContentType(vnot.message[m.quoted.mtype].message)] : vnot.message[m.quoted.mtype])
                    so.viewOnce = false
                    console.log(JSON.stringify(vnot ,null , 2))
                    await onic.sendMessageJson(m.chat, vnot)
                }
                break
                case 'mc': {
                    if (!/video/.test(mime) && !/audio/.test(mime)) return await reply('Reply media brow')
                    if (!quoted) return await reply('Tidak mereply apapun, reply media')
                    if ((quoted.msg || quoted).seconds > 900) return await reply('Maximum 60 seconds!')
                    await react('🦶')
                    let media = await quoted.download()
                    let audio = await toAudio(media, 'mp4')
                    await onic.sendMessage(m.chat, {
                        audio: audio,
                        mimetype: 'audio/mpeg',
                        ptt: false
                    })
                }
                case 'vn': {
                    if (!quoted) return await reply('Tidak mereply apapun, reply media')
                    await react('🦶')
                    let vnot = (quoted.msg || quoted).fakeObj
                    vnot.message.audioMessage.ptt = true
                    await onic.sendMessageJson(m.chat, vnot)
                }
                break
            }

        }
        // console.log(rmdrdata)

        // await swicherCommand(cimmind)
    } catch (err) {
        m.reply(util.format(err))
        console.log(util.format(err))
    } finally {
        /**/
        console.log(__filename.replace('/data/data/com.termux/files/home', '.'), '→ Save');
        // svdata()
    }
}