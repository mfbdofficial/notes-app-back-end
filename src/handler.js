const {nanoid} = require('nanoid');
const notes = require('./notes');

//Untuk Menambahkan Catatan
const addNoteHandler = (request, h) => {
    const {title, tags, body} = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString(); //membuat object Date
    const updatedAt = createdAt;

    const newNote = {id, title, tags, body, createdAt, updatedAt};
    notes.push(newNote);
    const isSuccess = notes.filter((note) => note.id === id).length > 0;
    //filter() itu method yang bikin array baru berdasarkan data yang lolos dari syarat parameter function yang kita buat
    //di atas itu yang lolos adalah object note dengan property note.id yang sama dengan id yang sudah di-generate sebelumnya)
    //jadi kalo length lebih besar dari 0 maka ada yang lulus (ada yang id-nya sama), berarti data-nya ada dan masuk

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id
            } 
        }) //bentuk isi parameter response() itu kita sendiri yang menentukan (kita nentuin ada "status", "message", "data"), sebenarnya mah bebas
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
};

//Untuk Mengambil Data Catatan
const getAllNotesHandler = (request, h) => {
    const response = h.response({
        status: 'success',
        data: {
            notes: notes
        }
    });
    response.code(200);
    return response;
}
//bisa langsung seperti cara di bawah, sama aja
/*
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
}); //artinya kita langsung atur untuk return response-nya, code sudah default-nya 200 OK
*/
const getNoteByIdHandler = (request, h) => {
    const {id} = request.params;
    const note = notes.filter((n) => n.id === id)[0];
    //di atas itu notes-nya di-filter berdasarkan yang id-nya sama, lalu ambil yang index pertama (karena filter itu me-return array)

    if (note !== undefined) {
        /*
        const response = h.response({
            status: 'success',
            data: {
                note
            }
        });
        response.code(200);
        return response;
        */
        //di atas bisa disingkat langsung dengan cara di bawah ini, langsung return isi object saja (status code dafult-nya 200)
        return {
            status: 'success',
            data: {
                note
            }
        }
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan'
    });
    response.code(404);
    return response;
}

//Untuk Mengubah (Edit) Data Catatan
const editNoteByIdHandler = (request, h) => {
    const {id} = request.params;
    const {title, tags, body} = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((n) => n.id === id);
    if (index !== -1) {
        notes[index] = {...notes[index], title, tags, body, updatedAt}; //semua key dan value yang lama akan ada, kalo yang baru akan tertimpa
        //spread operator pada kode di atas digunakan untuk mempertahankan nilai (key dan value) "notes[index]" yang tidak perlu diubah
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui'
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan'
    });
    response.code(404);
    return response;
}

//Untuk Menghapus Catatan
const deleteNoteByIdHandler = (request, h) => {
    const {id} = request.params;
    const index = notes.findIndex((n) => n.id === id); //findIndex() sudah langsung kembalikan nilai index, dan kembalikan nilai -1 jika tidak ada

    if (index !== -1) {
        notes.splice(index, 1); //potong atau hilangkan data dari index tertentu sebanyak 1 (karena kita kasih parameter-nya 1)
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}

//nanti akan banyak function request handler, jadi export pakai objek literals
module.exports = {addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler};