import mongoose from "mongoose";

// Define your schema
const programSchema = new mongoose.Schema({
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
}, { collection: 'Program_Curse' });

// Create a unique index on the specified fields
programSchema.index({
    nume_nava: 1, 
    data_plecare: 1, 
    data_sosire_estimata: 1, 
    port_plecare: 1, 
    port_sosire: 1
}, { unique: true });

// Create the model
const Program = mongoose.model('Program', programSchema);

export default Program;
