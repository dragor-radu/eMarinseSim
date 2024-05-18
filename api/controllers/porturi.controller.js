import Porturi from '../models/porturi.model.js';

export const getPorturi = async (req, res) => {
    try {
        const porturi = await Porturi.find();
        res.status(200).json(porturi);
        console.log(porturi);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}