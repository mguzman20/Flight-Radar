'use client'

import React from "react";
import { Plane } from '@/types/Plane'
import { useWebSocket } from "./websocket";
import FlightTable from "./components/table";
import Map from "./components/map";
import Chat from "./components/chat";


export default function Home() {
    return (
        <div className="m-10 flex-1">
            <div className="grid grid-cols-3">
                <div className="col-span-2">
                    <Map />
                    <FlightTable />
                </div>
                <div className="col-span-1">
                    
                    <Chat />
                </div>
            </div>
        </div>
    );
}
