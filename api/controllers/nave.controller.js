import Nave from '../models/nave.model.js';

export const getNave = async (req, res) => {
    try {
        const nave = await Nave.find();
        res.status(200).json(nave);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateNave = async (req, res) => {
    try {
        const { nume_nava, coordonate, status } = req.body;
        const { latitudine, longitudine } = coordonate[0];
        const latitudeDouble = parseFloat(latitudine);
        const longitudeDouble = parseFloat(longitudine);

        if (isNaN(latitudeDouble) || isNaN(longitudeDouble)) {
            throw new Error('Latitude and longitude must be doubles');
        }
        const nave = await Nave.findOneAndUpdate(
            { nume_nava },
            {
              $set: {
                coordonate: { latitudine: latitudeDouble, longitudine: longitudeDouble },
                status,
                traseu
              },
              $push: {
                traseu: {
                  timestamp: new Date(),
                  coordonate: { latitudine: latitudeDouble, longitudine: longitudeDouble }
                }
              }
            },
            { new: true }
          );
        res.status(200).json(nave);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

