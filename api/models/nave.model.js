import mongoose from "mongoose";

const nave = new mongoose.Schema({
    nume_nava: {
        type: String,
        required: true
    },
    tip_nava: {
        type: String,
        required: true
    },
    traseu: {
        type: Array,
    },
    status: {
        type: String,
        required: true
    },
    coordonate: {
        type: Object
    },
    locuri_disponibile: {
        type: Number
    },
    tone_disponibile: {
        type: Number
    }
}, { collection: 'Nave' });

const Nave = mongoose.model('Nave', nave);

export default Nave;

