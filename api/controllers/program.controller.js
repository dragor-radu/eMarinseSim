import Program from '../models/program.model.js';

export const getProgram = async (req, res) => {
    try {
        const program = await Program.find();
        res.status(200).json(program);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addProgram = async (req, res) => {
    console.log(req.user.userId, req.params.id);
    if (req.user.userId !== req.params.id) {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    try {
        const program = req.body;
        console.log(program);
        const newProgram = new Program(program);
        await newProgram.save();
        res.status(201).json(newProgram);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteProgram = async (req, res) => {
    const { id } = req.body;
    try {
        await Program.findByIdAndRemove(id);
        res.status(200).json({ message: 'Program deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}