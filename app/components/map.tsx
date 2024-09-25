'use client'

import React, { useRef, useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { useWebSocket } from "../websocket";
import { Popover } from "@nextui-org/react";

const planeIcon = L.icon({
    iconUrl: '614.png',
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

export default function Map() {
    const mapRef = useRef(null);
    const { planes } = useWebSocket();


    return ( 
    // Make sure you set the height and width of the map container otherwise the map won't show
        <MapContainer zoom={2} ref={mapRef} className="h-[60vh] w-full col-span-3">
            <FitWorldView />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {planes.map((plane, index) => (
                <Marker key={index} position={[plane.position.lat, plane.position.long]} icon={planeIcon}>
                    <Popup >
                        <div className="flex flex-col">
                            <span className="text-black font-bold">{plane.flight_id}</span>
                            <span className="text-gray-500 text-xs"> {plane.airline.name}</span>
                            <span className="text-gray-500 text-xs"> {plane.status}</span>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};