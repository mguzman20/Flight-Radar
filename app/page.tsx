'use client'

import React from "react";
import { Plane } from '@/types/Plane'
import { useWebSocket } from "./websocket";
import FlightTable from "./components/table";
import Chat from "./components/chat";
import MessageForm from "./components/messageForm";
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./components/map'), { ssr: false });

export default function Home() {
    return (
        <div className="p-5 h-screen w-screen max-h-screen">
            <div className="grid grid-cols-4 gap-4">
                <Map />
                <Chat />
                <FlightTable />
                <MessageForm    />
            </div>
        </div>
    );
}
