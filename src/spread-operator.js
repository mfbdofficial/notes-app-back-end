//cuma contoh untuk percobaan spread operator pada object (contoh untuk file handler.js)
//file ini tidak ada hubungannya dengan server, dihapus pun server tidak akan terpengaruh
const notes = [
    {
        id: 'xxxx',
        title: 'abc',
        tags: 'aku, kamu, dia',
        body: 'ini isinya bos',
        createdAt: 'hari ini',
        updatedAt: 'besok'
    }
];

const title = 'cbt';
const tags = 'dia, mereka, orang - orang';
const body = 'ini luarnya bos';
const updatedAt = 'lusa';

notes[0] = {...notes[0], title, tags, body, updatedAt};

console.log(notes);