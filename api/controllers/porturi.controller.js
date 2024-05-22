import Porturi from '../models/porturi.model.js';

export const getPorturi = async (req, res) => {
    try {
        const porturi = await Porturi.find();
        res.status(200).json(porturi);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updatePort = async (req, res) => {
    try {
        const {nume_port, numar_nave_in_port} = req.body;
        const port = await Porturi.findOneAndUpdate(
            { nume_port },
            { $set: { numar_nave_in_port } },
            { new: true }
        );
        res.status(200).json(port);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}