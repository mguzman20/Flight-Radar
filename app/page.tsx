'use client'

import React from "react";
import { Plane } from '@/types/Plane'
import { useWebSocket } from "./websocket";


export default function Home() {
    const { planes } = useWebSocket();
    return (
        <div>
            <h1>Mapa de aviones</h1>
        </div>
    );
}
