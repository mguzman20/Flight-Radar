'use client'

import React, { useRef, useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { useWebSocket } from "../websocket";
import { format } from 'date-fns/format';

function createRotatedPlaneIcon(heading: number) {
    return L.divIcon({
        html: `<img src="plane.png" style="transform: rotate(${heading}deg); width: 40px; height: 40px;" />`,
        iconSize: [40, 40],
        className: 'plane-icon', // Avoid leaflet default styles
    });
}

const departureIcon = L.icon({
    iconUrl: 'departure.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});

const destinationIcon = L.icon({
    iconUrl: 'destination.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});

function FitWorldView() {
    const map = useMap();
    
    useEffect(() => {
        map.setView([20, 0], 1); // Automatically adjusts the map to fit the whole world
    }, [map]);

    return null;
}

const getHeading = (planeLat: number, planeLng: number, destLat: number, destLng: number): number => {
    const toRadians = (degree: number) => degree * (Math.PI / 180);
    const toDegrees = (radian: number) => radian * (180 / Math.PI);

    const dLng = toRadians(destLng - planeLng);
    const lat1 = toRadians(planeLat);
    const lat2 = toRadians(destLat);

    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) -
              Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

    const heading = toDegrees(Math.atan2(y, x));
    
    // Normalize to 0 - 360 degrees
    return (heading + 360) % 360;
};


export default function Map() {
    const mapRef = useRef(null);
    const { planes, flights } = useWebSocket();


    return ( 
    // Make sure you set the height and width of the map container otherwise the map won't show
        <MapContainer zoom={2} ref={mapRef} className="h-[60vh] w-full col-span-3">
            <FitWorldView />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {flights.map((flight, index) => {
                const plane = planes.find(plane => plane.flight_id === flight.id);
                if (!plane) {
                    return null;
                }

                const heading = getHeading(plane.position.lat, plane.position.long, flight.destination.location.lat, flight.destination.location.long);
                return (
                    <>  
                        <Marker key={index} position={[plane.position.lat, plane.position.long]} icon={createRotatedPlaneIcon(heading)}>
                            <Popup >
                                <div className="flex flex-col">
                                    <span className="text-black font-bold">{plane.flight_id}</span>
                                    <span className="text-gray-500 text-xs">Aereolínea: {plane.airline.name}</span>
                                    <span className="text-gray-500 text-xs">Capitán: {plane.captain}</span>
                                    <span className="text-gray-500 text-xs">ETA: {format(plane.arrival, "yyyy-MM-dd hh:mm")} </span>
                                    <span className="text-gray-500 text-xs">Estado: {plane.status}</span>
                                </div>
                            </Popup>
                        </Marker>
                        <Marker key={index} position={[flight.departure.location.lat, flight.departure.location.long]} icon={departureIcon} >
                            <Popup>
                                <div className="flex flex-col">
                                    <span className="text-black font-bold">{flight.departure.name}</span>
                                    <span className="text-gray-500 text-xs"> {flight.departure.city.name} - {flight.departure.city.country.name}</span>
                                    <span className="text-gray-500 text-xs"> Aereopueto de salida de vuelo:</span>
                                    <span className="text-gray-500 text-xs"> {flight.id}</span>
                                </div>
                            </Popup>
                        </Marker>
                        <Marker key={index} position={[flight.destination.location.lat, flight.destination.location.long]} icon={destinationIcon}>
                            <Popup>
                                <div className="flex flex-col">
                                    <span className="text-black font-bold">{flight.destination.name}</span>
                                    <span className="text-gray-500 text-xs"> {flight.destination.city.name} - {flight.destination.city.country.name}</span>
                                    <span className="text-gray-500 text-xs"> Aereopueto de llegada de vuelo:</span>
                                    <span className="text-gray-500 text-xs"> {flight.id}</span>
                                </div>
                            </Popup>
                        </Marker>
                        <Polyline 
                            key={`line-${index}`}
                            positions={[[flight.departure.location.lat, flight.departure.location.long], [flight.destination.location.lat, flight.destination.location.long]]}
                            color="gray" // Puedes cambiar el color si lo deseas
                            weight={1} // Grosor de la línea
                        />
                    </>
                )})}
            
        </MapContainer>
    );
};