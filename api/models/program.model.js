import mongoose from "mongoose";

const program = new mongoose.Schema({
    nume_nava: {
        type: String,
        required: true
    },
    data_plecare: {
        type: Date,
        required: true
    },
    data_sosire_estimata: {
        type: Date,
        required: true
    },
    port_plecare: {
        type: String,
        required: true
    },
    port_sosire: {
        type: String,
        required: true
    },
    traseu: {
        type: Array,
        required: true
    },
}, { collection: 'Program_Curse' });

const Program = mongoose.model('Program', program);

export default Program;
