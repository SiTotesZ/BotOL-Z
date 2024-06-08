//━━━[ Bahasa sehari hari ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
exports.contoh = (prefix, command, style, style2 = "query") => {
    return `Contoh penggunaan: \n${prefix + command} ${style2}\n\n${prefix + command} ${style}`
}
exports.wait = () => {
    return `⏳ Mohon tunggu sebentar`
}
exports.ok = () => {
    return `✅ Done.`
}
exports.sending = (pe) => {
    if (pe) {
        return 'Sedang Mengirim → ✈️' + `\n${pe}`
    } else {
        return 'Sedang Mengirim → ✈️'
    }
}

exports.doneErr = (pe) => {
    if (pe) {
        return `Convert Berhasil. Tetapi bot Gagal Mengirim ${pe} ke anda. Coba ulang`
    } else {
        return `Convert Berhasil. Tetapi bot Gagal Mengirim File ke anda. Coba ulang`
    }
}

exports.waitt = () => {
    return '⏳'
}
exports.sendingg = () => {
    return '✈️'
}
exports.okk = () => {
    return `✅`
}


//━━━[ Kusus Grub ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
exports.bukanadmin = () => {
    return 'Tolong Jadikan Admin grub untuk menggunakan fitur ini😉'
}

exports.adminOnly = () => {
    return 'Fitur ini khusus admin saja😉'
}

exports.targetkick = () => {
    return `Kirim nomer/tag/reply target yang ingin di kick !`
}

exports.nokickpemilik = () => {
    return `Kamu tidak dapat mengeluarkan SiTotes dan Pembuat grub`
}


exports.useradd = () => {
    return `Kirim nomer yang ingin di tambahkan !`
}


exports.userpromot = () => {
    return `Kirim nomer yang ingin di naikkan jabatannya / di jadikan admin !`
}

exports.userdemot = () => {
    return `Kirim nomer yang ingin di turunkan jabatannya / di jadikan member atau bukan admin !`
}

//━━━[ Game ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
exports.JwbTrue = (soalapa, rpmoney, totalxp, mainlagi) => {
    return `╭─❒ 「 *🎉 SELAMAT 🎉* 」 
├ _🎊Jawaban Anda benar 🎊_ 
│
├→ ╭─( *🎁 Hadiah* )
│     │
│     ├💰 *Rp: ${rpmoney}* 
│     ├ 🧩 + *${totalxp}* _XP_ 
│     ╰→
╰❒ *${soalapa}* 


ketik Perintah:
*#${mainlagi}*

Untuk bermain lagi 👍`
}

exports.JwbHampir = () => {
    return `*🧐 _Ya, dikit lagi Kak_ 😅*`
}
exports.JwbErr = () => {
    return `*😮‍💨 Jawaban Salah 👻*
━━━━━━━━━━━━
 ` + '```Ketik Perintah:``` ' + `
*#bantuan*
untuk meminta bantuan 😌dan

*#nyerah*
untuk menyerah 😵`
}


//━━━[ Sticker ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
exports.SmemeErr = (prefix, command) => {
    return `Kirim/Reply Foto Dengan Caption ${prefix + command} *teks nya*`
}
exports.NoToStik = (prefix, command) => {
    return `Kirim/Reply Gambar/Video Dengan Caption ${prefix + command}\n\nDurasi Sticker Video 1-9 Detik`
}


//━━━[ Menu ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
exports.allmenu = (prefix) => {
    return `*╭─❒ 「 Semua Fitur 」*
│
*├╭─( Media download )────•*
││
*│├╭→ #Tiktok*
│││
││├ ${prefix}tt ${'`https://url`'}
││├ ${prefix}downloadtiktok ${'`https://url`'}
││├ ${prefix}tiktokunduh ${'`https://url`'}
││├ ${prefix}tiktok ${'`https://url`'}
││╰×
││
*│├╭→ #Instagram*
│││
││├ ${prefix}ig ${'`https://url`'}
││├ ${prefix}igdl ${'`https://url`'}
││├ ${prefix}igdownload ${'`https://url`'}
││├ ${prefix}igunduh ${'`https://url`'}
││├ ${prefix}igsv ${'`https://url`'}
││├ ${prefix}instagramdl ${'`https://url`'}
││├ ${prefix}instagram ${'`https://url`'}
││├ ${prefix}instagrams ${'`https://url`'}
││├ ${prefix}instagramsdl ${'`https://url`'}
││├ ${prefix}instagramunduh ${'`https://url`'}
││├ ${prefix}igreel ${'`https://url`'}
││├ ${prefix}igvideo ${'`https://url`'}
││├ ${prefix}igimage ${'`https://url`'}
││├ ${prefix}igpost ${'`https://url`'}
││╰×
││
*│├╭→ #Youtube*
│││
││├ ${prefix}youtube ${'`https://url`'}
││├ ${prefix}youtubedownload ${'`https://url`'}
││├ ${prefix}youtubedl ${'`https://url`'}
││├ ${prefix}ytdl ${'`https://url`'}
││├ ${prefix}youtubemp4 ${'`https://url`'}
││├ ${prefix}youtubemp3 ${'`https://url`'}
││├ ${prefix}ytmp4 ${'`https://url`'}
││├ ${prefix}ytmp3 ${'`https://url`'}
││╰×
││
*│├╭→ #Youtube Music Apis*
│││
││├ ${prefix}mainkan ${'`judul`'}
││├ ${prefix}music ${'`judul`'}
││├ ${prefix}play ${'`judul`'}
││├ ${prefix}lagu ${'`judul`'}
│││
││╰×
││
*│├╭→ #Pinterest*
│││
││├ ${prefix}pinters ${'`srch`'}
││├ ${prefix}pintrs ${'`srch`'}
││├ ${prefix}pint ${'`srch`'}
││├ ${prefix}pinterest ${'`srch`'}
│││
││╰×
││
│╰──────────•
│
│
*├╭─( Funn/ Bot AI )────•*
││
*│├╭→ #ChatGpt / Openai*
│││
││├ bot ${'`pertanyaan`'}
││├ ai ${'`pertanyaan`'}
││╰×
││
*│├╭→ #Funn / Random Macth*
│││
││├ ${prefix}rate ${'`contoh seberapa alay gwe`'}
││╰×
││
│╰─────────────•
│
*├╭─( Anime Menu )────•*
││
*│├╭→ #QuotAnime*
│││
││├ ${prefix}katakataanime
││├ ${prefix}quotesanime
││├ ${prefix}quotanim
││├ ${prefix}qanim
││├ ${prefix}quotanim
│││
││╰×
││
│╰─────────────•
│
*├╭─( Google IT )────•*
││
*│├╭→ #Google Pencarian*
│││
││├ ${prefix}google ${'`srch`'}
│││
││╰×
││
*│├╭→ #Google AI*
│││
││├ gemini ${'`pertanyaan`'}
││├ geminiai ${'`pertanyaan`'}
││├ googlegemini ${'`pertanyaan`'}
││├ googlegeminiai ${'`pertanyaan`'}
││├ googleai ${'`pertanyaan`'}
││├ googlebard ${'`pertanyaan`'}
││├ bardai ${'`pertanyaan`'}
││├ bard ${'`pertanyaan`'}
││├ gbard ${'`pertanyaan`'}
││├ goai ${'`pertanyaan`'}
│││
││╰×
││
*│├╭→ #Google Pengingat*
│││
││├ ${prefix}setrr
││├ ${prefix}setrmdr
││├ ${prefix}setreminder
│││
││╰×
││
*│├╭→ #Emojimix Sticker*
│││
││├ ${prefix}emojimix ${'`😁+🥴`'}
│││
││╰×
││
│╰─────────────•
│
*├╭─( Media Sticker )────•*
││
*│├╭→ #Sticker*
│││
││├ ${prefix}s
││├ ${prefix}sticker
││├ ${prefix}stiker
││╰×
││
*│├╭→ #Memegen Api*
│││
││├ ${prefix}smeme ${'`teks`'}
││├ ${prefix}smemegen ${'`teks`'}
││├ ${prefix}stickermeme ${'`teks`'}
││├ ${prefix}smeme2 ${'`teks`'}
││╰×
││
│╰─────────────•
│
│
*├╭─( Admin Grub )────•*
││
*│├╭→ #Kick / Mengeluarkan*
│││
││├ ${prefix}kick ${'`@user`'}
││├ ${prefix}keluarkan ${'`@user`'}
││├ ${prefix}hapus ${'`@user`'}
││├ ${prefix}remove ${'`@user`'}
││╰×
││
*│├╭→ #Add / Menambah*
│││
││├ ${prefix}add ${'`+62757`'}
││├ ${prefix}tambah ${'`+62757`'}
││├ ${prefix}new ${'`+62757`'}
││╰×
││
*│├╭→ #Promote / JadikanAdmin*
│││
││├ ${prefix}promote ${'`@user`'}
││├ ${prefix}naikan ${'`@user`'}
││├ ${prefix}jabatkan ${'`@user`'}
││╰×
││
*│├╭→ #Demote / Jadikan Tidak Admin*
│││
││├ ${prefix}demote ${'`@user`'}
││├ ${prefix}turunkan ${'`@user`'}
││├ ${prefix}kucilkan ${'`@user`'}
││╰×
││
*│├╭→ #ListOnline / Yang on di grub*
│││
││├ ${prefix}liston
││├ ${prefix}listonline
││╰×
││
*│├╭→ #TagAll / Sebut semua orang*
│││
││├ ${prefix}tagall ${'`teks`'}
││├ ${prefix}infoall ${'`teks`'}
││├ ${prefix}tagsemua ${'`teks`'}
││╰×
││
*│├╭→ #HideTag / TagAll tanpa Tag*
│││
││├ ${prefix}h ${'`teks`'}
││├ ${prefix}hidetag ${'`teks`'}
││╰×
││
│╰──────────•
│
╰❒`
}
