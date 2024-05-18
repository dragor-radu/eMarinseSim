import Nave from '../models/nave.model.js';

export const getNave = async (req, res) => {
    try {
        const nave = await Nave.find();
        res.status(200).json(nave);
        console.log(nave);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}