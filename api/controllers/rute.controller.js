import Ruta from "../models/rute.model.js";

export const getRuta = async (req, res) => {
    try {
        const ruta = await Ruta.find();
        res.status(200).json(ruta);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}