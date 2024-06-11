global.__base = __dirname + '/';
global.__nbl = {}
// require('./src/options/settings')

const { Boom } = require('@hapi/boom')
const NodeCache = require('node-cache')
const readline = require('readline')
const {
    default: makeWASocket,
    AnyMessageContent,
    BinaryInfo,
    DisconnectReason,
    encodeWAM,
    delays,
    fetchLatestBaileysVersion,
    getAnggreVotesInPollMessage,
    makeCacheableSignalKeyStore,
    makeInMemoryStore,
    PHONENUMBER_MCC,
    proto,
    useMultiFileAuthState,
    WAMessageKey,
} = require('@whiskeysockets/baileys')

// const MAIN_LOGGER = require('')
const pino = require('pino')

// const open = require('open')
const fs  = require('fs')




// const logger = MAIN_LOGGER.child({})
// logger.level = 'trace'
const logger = pino().child({
    level: 'silent',
    stream: 'store'
})


const useStore = true
const doReplies = !false
const usePairingCode = true
const useMobile = false


const msgRetryCounterCache = new NodeCache()

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))


const store = useStore ? makeInMemoryStore({ logger }) : undefined
store?.readFromFile('./baileys_store_multi.json')



try {
    store?.readFromFile('./src/session/baileys_store_multi.json')
} catch (error) {
    fs.writeFileSync('./src/session/baileys_store_multi.json', '{"chats":[],"contacts":{},"messages":{},"labels":[],"labelAssociations":[]}')
    store?.readFromFile('./src/session/baileys_store_multi.json')
    throw new Error('Bot Crash → By sitotes anti loop')
}
setInterval(() => {
    store?.writeToFile('./src/session/baileys_store_multi.json')
}, 10000)





// system database 2024 by sitotes
const { turudek } = require('./lib/sitotesFunc')
const nodecron = require('node-cron')


// global.db = JSON.parse(fs.readFileSync("./src/.sitotes/data/database.json"))
// global.ky_ttt = []

// if (global.db) global.db.data = {
//     game: {},
//     proses: {},
//     ...(global.db.data || {})
// }

__nbl.ttlerr = 0
__nbl.resetcache = 0
__nbl.chekid = {}
__nbl.lcInfo = './src/.sitotes/data/data-msg.json'

// try {
//     __nbl.infoMSG = JSON.parse(fs.readFileSync(__nbl.lcInfo));
// } catch (error) {
//     console.error("Error reading or parsing file:", error);
//     __nbl.infoMSG = [];
// }
console.log('SiTotes Bot Wait Running...')




async function sitotesBoot (){

    const { state, saveCreds } = await useMultiFileAuthState('./src/session/creds-file')

    const { version, isLatest } = await fetchLatestBaileysVersion()
    console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`)

    const onic = makeWASocket({
        version,
        logger: pino({
            level: 'fatal'
        }).child({
            level: 'fatal'
        }),
        printQRInTerminal: !usePairingCode,
        mobile: useMobile,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({
                level: 'fatal'
            }).child({
                level: 'fatal'
            })),
        },
        msgRetryCounterCache,
        generateHighQualityLinkPreview: true,
        getMessage,
    })

    store?.bind(onic.ev)


    onic.sendPesan = async (...args) => {
        await turudek(0.5)
        return await onic.sendMessage(...args)
    }

    // console.log('SiTotes Bot Menghubungkan ulang...')

    function nocache(module, cb = () => {}) {
        fs.watchFile(require.resolve(module), async () => {
            await uncache(require.resolve(module))
            cb(module)
        })
    }
    
    function uncache(module = '.') {
        return new Promise((resolve, reject) => {
            try {
                delete require.cache[require.resolve(module)]
                resolve()
            } catch (e) {
                reject(e)
            }
        })
    }
    
    require('./src/onic-func')(onic, store)
    nocache('./src/onic-func', module => {
        require(module)(onic, store)
        console.log(` "${module}" Telah diupdate!`)
    })
    
    require('./src/onic-notif')(onic, store, state, saveCreds, version, isLatest)
    nocache('./src/onic-notif', async module => {
        onic.ev.removeAllListeners('messages.upsert');
        onic.ev.removeAllListeners('messages.update');
        onic.ev.removeAllListeners('poll-recipient');
        onic.ev.removeAllListeners('schedule-trigger');
        require(module)(onic, store, state, saveCreds, version, isLatest)
        console.log(` "${module}" Telah diupdate!`)
    })


    if(usePairingCode && !onic.authState.creds.registered) {
        if(useMobile) throw new Error('Cannot use pairing code with mobile api')

        var phoneNumber = await question('SI TOTES:   Ketik nomor whatsapp kamu:\n')
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
        if(!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log('SI TOTES:  Mulain dengan kode negara contoh : 62xxx')

            phoneNumber = await question('SI TOTES:   Ketik nomor whatsapp kamu:\n')
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
            rl.close()
        }
        const code = await onic.requestPairingCode(phoneNumber)
        console.log(`Pairing code: ${code}`)
    }


    onic.ev.on('connection.update', async (update) => {
        // console.log('connection update', update)
        const {
            connection,
            lastDisconnect,
        } = update
        if (connection === 'close') {
            __nbl.ttlerr++
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if (reason === DisconnectReason.badSession) {
                console.log(`SENDER → File Sesi Buruk, Harap Hapus Sesi dan Pindai Lagi`)
                // setTimeout(sitotesBoot, 10000)
                throw new Error('Bot Crash → By sitotes anti Stuck reload')
            } else if (reason === DisconnectReason.connectionClosed) {
                console.log("SENDER → Koneksi ditutup, menghubungkan kembali....")
                //setTimeout(sitotesBoot, 10000)
                throw new Error('Bot Crash → By sitotes anti Stuck reload')
            } else if (reason === DisconnectReason.connectionLost) {
                console.log("SENDER → Koneksi Hilang dari Server, menyambungkan kembali...")
                //setTimeout(sitotesBoot, 10000)
                throw new Error('Bot Crash → By sitotes anti Stuck reload')
            } else if (reason === DisconnectReason.connectionReplaced) {
                console.log("SENDER → Koneksi Diganti, Sesi Baru Lain Dibuka, menghubungkan kembali...")
                setTimeout(sitotesBoot, 10000)
            } else if (reason === DisconnectReason.loggedOut) {
                console.log(`SENDER → Perangkat Keluar, Harap Pindai Lagi Dan Jalankan.`)
                setTimeout(sitotesBoot, 10000)
            } else if (reason === DisconnectReason.restartRequired) {
                console.log("SENDER → Restart Diperlukan, Restart...")
                setTimeout(sitotesBoot, 10000)
            } else if (reason === DisconnectReason.timedOut) {
                console.log("SENDER → Koneksi Habis, Menghubungkan...")
                setTimeout(sitotesBoot, 10000)
            } else onic.end(`SENDER → Alasan Putus Tidak Diketahui: ${reason}|${connection}`)

            if (__nbl.ttlerr > 3) {
                console.log('Crash by → Connection Loop')
                throw new Error('Bot Crash → By sitotes anti loop')
            }
        }
        if (update.connection == "open" || update.receivedPendingNotifications == "true") {
            await store.chats.all()
            console.log(`Terhubung dengan = ` + JSON.stringify(onic.user, null, 2))
        }
    })

    
    return onic

    async function getMessage(key) {
        if(store) {
            const msg = await store.loadMessage(key.remoteJid, key.id)
            return msg?.message || undefined
        }

        return proto.Message.fromObject({})
    }
}

sitotesBoot()