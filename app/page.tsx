'use client'

import React from "react";
import { Plane } from '@/types/Plane'
import { useWebSocket } from "./websocket";


export default function Home() {
    const { planes } = useWebSocket();
    return (
        <div>
            <h1>Flights</h1>
            <ul>
                {planes.map((plane) => (
                    <li key={plane.flight_id}>
                        <h2>{plane.flight_id}</h2>
                        <p>{plane.airline.name}</p>
                        <p>{plane.captain}</p>
                        <p>{plane.position.lat}</p>
                        <p>{plane.position.long}</p>
                        <p>{plane.heading.lat}</p>
                        <p>{plane.heading.long}</p>
                        <p>{plane.ETA}</p>
                        <p>{plane.distance}</p>
                        <p>{plane.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
