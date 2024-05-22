import Program_Curse from '../models/program.model.js';
import Nave from '../models/nave.model.js';
import Ruta from '../models/rute.model.js';
import { updateNave } from './nave.controller.js';

let intervalId;
let intervalRuta;
export const startProgramCheck = async (req, res) => {
  try {
    if (intervalId) {
      clearInterval(intervalId);
    }

    intervalId = setInterval(async () => {
      const now = new Date();
      const currentDate = new Date(now);
      currentDate.setSeconds(0, 0);

      console.log(now);
      const programs = await Program_Curse.find();

      for (let program of programs) {
        const programDate = new Date(program.data_plecare);
        programDate.setSeconds(0, 0);
        if (program && programDate.getTime() === currentDate.getTime()) {
          navigateNava(program.nume_nava, program.port_plecare, program.port_sosire);
        }
      }
    }, 59999);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const stopProgramCheck = async (req, res) => {
  try {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }

    res.status(200).json({ message: 'Program check stopped' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const navigateNava = async (nume_nava, port_plecare, port_sosire ) => {
    let ruta = {};
    let point = 0;
    let traseu = [];
    console.log(`Navigating nava ${nume_nava} from ${port_plecare} to ${port_sosire}`);
    try {
        ruta = await Ruta.findOne({
            $or: [
              { nume_port1: port_plecare, nume_port2: port_sosire },
              { nume_port2: port_plecare, nume_port1: port_sosire }
            ]
          });
        console.log(`Ruta: ${ruta}`);  
    } catch (error) {
        console.log(error);
    }
    try {
        if (intervalRuta) {
            clearInterval(intervalRuta);
        }
        intervalId = setInterval(async () => {
            traseu = ruta.traseu;
            if (port_plecare === ruta.nume_port2) {
                traseu = traseu.reverse();
            }
            if (ruta.traseu[point]) {
                console.log(`Navigating to ${traseu[point].latitudine}, ${traseu[point].longitudine } `)
                const latitudeDouble = parseFloat(traseu[point].latitudine);
                const longitudeDouble = parseFloat(traseu[point].longitudine);

                if (isNaN(latitudeDouble) || isNaN(longitudeDouble)) {
                    throw new Error('Latitude and longitude must be doubles');
                }
                if (point === ruta.traseu.length - 1) {
                  const nava = await Nave.findOneAndUpdate(
                      { nume_nava },
                      {
                          $set: {
                              coordonate: { latitudine: latitudeDouble, longitudine: longitudeDouble },
                              status: "in port",
                              traseu: {
                                  timestamp: new Date(),
                                  coordonate: { latitudine: latitudeDouble, longitudine: longitudeDouble }
                              }
                          },
                      },
                      { new: true }
                  );
                  clearInterval(intervalId);
              } else if(point === 0){
                const nava = await Nave.findOneAndUpdate(
                    { nume_nava },
                    {
                      $set: {
                          coordonate: { latitudine: latitudeDouble, longitudine: longitudeDouble },
                          status: "plecat",
                          traseu: {
                              timestamp: new Date(),
                              coordonate: { latitudine: latitudeDouble, longitudine: longitudeDouble }
                          }
                      },
                  },
                  { new: true }
              );
            } else {
                const nava = await Nave.findOneAndUpdate(
                    { nume_nava },
                    {
                        $set: {
                            coordonate: { latitudine: latitudeDouble, longitudine: longitudeDouble },
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
              }
                console.log(`Navigated nava ${nava.nume_nava}`);
            }
            point += 1;
        }, 10000);
        console.log("Navigate finsihsed!")
    } catch (error) {
        console.log(error);
    }
};