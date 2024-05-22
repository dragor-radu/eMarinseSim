import mongoose from "mongoose";

const ruta = new mongoose.Schema({
    nume_port1: {
        type: String,
        required: true
    },
    nume_port2: {
        type: String,
        required: true
    },
    traseu: {
        type: Array,
        required: true
    },
}, { collection: 'Rute_Curse' });

const Ruta = mongoose.model('Ruta', ruta);

export default Ruta;
