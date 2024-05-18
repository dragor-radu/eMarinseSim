import Program from '../models/program.model.js';

export const getProgram = async (req, res) => {
    try {
        const program = await Program.find();
        res.status(200).json(program);
        console.log(program);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}