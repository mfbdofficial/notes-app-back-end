// console.log('Hallo kita akan membuat RESTful API');
const x = 0;
if (x === 0) {
    // console.log('berhasil');
}

//Kriteria 1 - Web Server Dapat Menyimpan Data
//contoh bentuk data yang diinginkan nanti adalah array of object JavaScript :
/*
{
    id: 'notes-V1StGXR8_Z5jdHi6B-myT',
    title: 'Sejarah JavaScript',
    createdAt: '2020-12-23T23:00:09.686Z',
    updatedAt: '2020-12-23T23:00:09.686Z',
    tags: ['NodeJS', 'JavaScript'],
    body: 'JavaScript pertama kali dikembangkan oleh Brendan Eich dari Netscape di bawah nama Mocha, yang nantinya namanya diganti menjadi LiveScript, dan akhirnya menjadi JavaScript. Navigator sebelumnya telah mendukung Java untuk lebih bisa dimanfaatkan para pemrogram yang non-Java.',
},
*/
//Kriteria 2 – Web Server Dapat Menampilkan Catatan
//contoh bentuk seluruh data notes JSON dikembalikan
/*
{
    "status": "success",
    "data": {
        "notes": [
            {
                "id":"notes-V1StGXR8_Z5jdHi6B-myT",
                "title":"Catatan 1",
                "createdAt":"2020-12-23T23:00:09.686Z",
                "updatedAt":"2020-12-23T23:00:09.686Z",
                "tags":[
                    "Tag 1",
                    "Tag 2"
                ],
                "body":"Isi dari catatan 1"
            },
            {
                "id":"notes-V1StGXR8_98apmLk3mm1",
                "title":"Catatan 2",
                "createdAt":"2020-12-23T23:00:09.686Z",
                "updatedAt":"2020-12-23T23:00:09.686Z",
                "tags":[
                    "Tag 1",
                    "Tag 2"
                ],
                "body":"Isi dari catatan 2"
            }
        ]
    }
}
*/
//contoh data JSON untuk 1 data notes saja
/*
{
    "status": "success",
    "data": {
        "note": {
            "id":"notes-V1StGXR8_Z5jdHi6B-myT",
            "title":"Catatan 1",
            "createdAt":"2020-12-23T23:00:09.686Z",
            "updatedAt":"2020-12-23T23:00:09.686Z",
            "tags":[
                "Tag 1",
                "Tag 2"
            ],
            "body":"Isi dari catatan 1"
        }
    }
}
*/


//Membuat HTTP Server
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        //DEPLOY WEB SERVICES - Memperbaiki Bugs
        host: process.env.NODE_ENV !== 'production'? 'localhost' : '0.0.0.0', //operator ternary, kalo memenuhi (bukan "production") maka "localhost", kalo tidak memenuhi maka "0.0.0.0"
        routes: {
            cors: {
                origin: ['*'],
            },
        }, //pengaturan CORS untuk semua route, materi Same-Origin Policy
    })
    server.route(routes);
    await server.start();
    console.log(`Your server is running in ${server.info.uri}`);
};

init();
//NOTE: Untuk pengguna MacOS, kami menyarankan untuk tidak menggunakan port 5000, 
//karena versi MacOS Monterey, port tersebut sudah digunakan atau dipesan untuk layanan AirPlay Receiver,
//anda bisa mengubah nilai port yang aman untuk digunakan (Contoh, > 8000).