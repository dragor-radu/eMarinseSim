import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { FaAnchor } from "react-icons/fa";
import 'leaflet/dist/leaflet.css';
import ReactDOMServer from 'react-dom/server';
import { useEffect, useState } from 'react';


export default function Map() {
    const position = [15,0];
    const [porturi, setPorturi] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [positions, setPositions] = useState([]); // [ [lat, long], [lat, long] 
    useEffect(() => {
        const fetchPorturi = async () => {
        try {
        const response = await fetch('/api/porturi/getPorturi');
        const data = await response.json();
        console.log(data);
        setPorturi(data);
        setIsLoading(false);
        } catch (error) {
        console.error(error);
        }
    };
    fetchPorturi();
    }, []);
    const getRandomColor = () => {
        const letters = '012345678';
        let color = '#';
        for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 10)];
        }
        return color;
    };
    return (
        <MapContainer center={position} zoom={3} minZoom={3} maxZoom={6} style={{ height: '100%', width: '100%' }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {!isLoading && porturi.map((port) => {
            const anchorIcon = new L.DivIcon({
            html: ReactDOMServer.renderToString(<FaAnchor style={{ fontSize: '14px', fontWeight: 'bold', color: getRandomColor() }} />),
            iconAnchor: [10, 10],
            className: '' // Optional: add custom styling
            });

            return (
            <Marker key={port._id} position={[port.coordonate.latitudine, port.coordonate.longitudine]} icon={anchorIcon}>
                <Popup>
                <h1>Port: {port.nume_port}</h1>
                <p>Tara: {port.tara}</p>
                </Popup>
            </Marker>
            );
        })}
        </MapContainer>
    );
}
