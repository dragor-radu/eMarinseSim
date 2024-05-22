import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { FaAnchor, FaShip } from "react-icons/fa";
import 'leaflet/dist/leaflet.css';
import ReactDOMServer from 'react-dom/server';
import { useEffect, useState, useRef } from 'react';

export default function Map() {
    const [formData, setFormData] = useState({ nume_nava: '' });
    const [submittedPosition, setSubmittedPosition] = useState([15, 0]);
    const [submittedZoom, setSubmittedZoom] = useState(3);
    const [porturi, setPorturi] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [programe, setPrograme] = useState([]); 
    const [nave, setNave] = useState([]);
    const [rute, setRute] = useState([]);
    const [portColors, setPortColors] = useState({});
    const [shipColors, setShipColors] = useState({});
    const [routeColors, setRouteColors] = useState({});
    const [isMapFly, setIsMapFly] = useState(false);
    const [onNava, setOnNava] = useState(false);
    const markerRefs = useRef({});

    const getRandomColor = () => {
        const colors = ["#FF0000", "#000000", "#FFFF00", "#FFA500", "#008000"];
        const index = Math.floor(Math.random() * colors.length);
        return colors[index];
    };

    useEffect(() => {
        const fetchPorturi = async () => {
            try {
                const response = await fetch('/api/porturi/getPorturi');
                const data = await response.json();
                setPorturi(data);

                // Assign colors
                const colors = {};
                data.forEach(port => {
                    colors[port._id] = getRandomColor();
                });
                setPortColors(colors);

                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPorturi();
    }, []);

    useEffect(() => {
        const fetchPrograme = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/program/getProgram');
                const data = await response.json();
                setPrograme(data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPrograme();
    }, []);

    useEffect(() => {
        const fetchRute = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/rute/getRuta');
                const data = await response.json();
                setRute(data);

                // Assign colors
                const colors = {};
                data.forEach(ruta => {
                    colors[ruta._id] = getRandomColor();
                });
                setRouteColors(colors);

                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRute();
    }, []);

    useEffect(() => {
        const fetchNave = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/nave/getNave');
                const data = await response.json();
                setNave(data);

                const colors = {};
                data.forEach(nava => {
                    colors[nava._id] = getRandomColor();
                });
                setShipColors(colors);

                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchNave();
        const intervalId = setInterval(fetchNave, 10000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);
    
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const nava = nave.find((nava) => nava.nume_nava === formData.nume_nava);
        if (nava) {
            const newPosition = [nava.coordonate.latitudine, nava.coordonate.longitudine];
            setSubmittedPosition(newPosition);
            setSubmittedZoom(7);
            setIsMapFly(true);
            setOnNava(true);
            markerRefs.current[formData.nume_nava].openPopup();
        }
    };

    const handleFormChange = (event) => {
        setFormData({ nume_nava: event.target.value });
    };

    const MapUpdater = ({ position, zoom }) => {
        const map = useMap();
        useEffect(() => {
            map.flyTo(position, zoom);
            setIsMapFly(false);
        }, [position, zoom]);
        return null;
    };

    return (
        <div>
            <div className='h-screen flex flex-col bg-blue-900 rounded shadow-md'>
                <h1 className='text-2xl text-center text-gray-100 py-5 font-sans '>
                    eMarine - Track your ship
                </h1>
                <form onSubmit={handleFormSubmit} className='flex justify-center items-center py-5'>
                    <input onChange={handleFormChange} type='text' placeholder='Enter your ship name' className='border-2 p-1 border-gray-500 rounded px-2' />
                    <button className='bg-gray-900 ml-2 p-1 text-white rounded px-2'>Track</button>
                </form>
                <div className='flex flex-1'>
                    <div className='h-full w-full border-8 border-black rounded'>
                        <div className='relative w-full h-full'>
                            <MapContainer center={submittedPosition} zoom={submittedZoom} minZoom={3} maxZoom={7} style={{ height: '100%', width: '100%' }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {isMapFly && <MapUpdater position={submittedPosition} zoom={submittedZoom} />}
                                {!isLoading && porturi.map((port) => {
                                    const anchorIcon = new L.DivIcon({
                                        html: ReactDOMServer.renderToString(<FaAnchor style={{ fontSize: '14px', fontWeight: 'bold', color: portColors[port._id] }} />),
                                        iconAnchor: [10, 10],
                                        className: '',
                                    });

                                    return (
                                        <Marker key={port._id} position={[port.coordonate.latitudine, port.coordonate.longitudine]} icon={anchorIcon}>
                                            <Popup>
                                                <h1>Port: {port.nume_port}</h1>
                                                <p>Oras: {port.oras}</p>
                                                <p>Tara: {port.tara}</p>
                                            </Popup>
                                        </Marker>
                                    );
                                })}
                                {!isLoading && rute.map((ruta) => {
                                    return (
                                        <Polyline
                                            key={ruta._id}
                                            positions={ruta.traseu.map((traseu) => [traseu.latitudine, traseu.longitudine])}
                                            weight={4}
                                            color={routeColors[ruta._id]}
                                            opacity={0.7}
                                            dashArray="5, 10" // 5px dash followed by 10px gap
                                        />
                                    );
                                })}
                                {!isLoading && nave.map((nava) => {
                                    const naveIcon = new L.DivIcon({
                                        html: ReactDOMServer.renderToString(<FaShip style={{ fontSize: '16px', fontWeight: 'bold', color: shipColors[nava._id] }} />),
                                        iconAnchor: [10, 10],
                                        className: '',
                                    });

                                    return (
                                        <div key={nava._id}>
                                            <Marker
                                            ref={el => markerRefs.current[nava.nume_nava] = el}
                                            position={[nava.coordonate.latitudine, nava.coordonate.longitudine]} icon={naveIcon}>
                                                <Popup open={onNava}>
                                                    <h1>Nume nava: {nava.nume_nava}</h1>
                                                    <p>Tip: {nava.tip_nava}</p>
                                                    {nava.locuri_disponibile && <p>Locuri: {nava.locuri_disponibile}</p>}
                                                    {nava.tone_disponibile && <p>Tone: {nava.tone_disponibile} kg</p>}
                                                    <p>Status: {nava.status}</p>
                                                </Popup>
                                            </Marker>
                                            <Polyline
                                                positions={nava.traseu.map((traseu) => [traseu.coordonate.latitudine, traseu.coordonate.longitudine])}
                                                weight={4}
                                                color={shipColors[nava._id]}
                                                opacity={0.7}
                                            />
                                        </div>
                                    );
                                })}
                            </MapContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
