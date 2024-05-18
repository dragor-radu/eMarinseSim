import mongoose from "mongoose";

const porturi = new mongoose.Schema({
    nume_port: {
        type: String,
        required: true
    },
    coordonate: {
        type: Object
    },
    oras: {
        type: String,
        required: true
    },
    tara: {
        type: String,
        required: true
    },
    numar_nave_in_port: {
        type: Number
    },
    numar_locuri_nave: {
        type: Number
    }
}, { collection: 'Porturi' });

const Porturi = mongoose.model('Porturi', porturi);

export default Porturi;
