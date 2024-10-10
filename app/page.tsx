'use client'

import React from "react";
import FlightTable from "./components/table";
import Chat from "./components/chat";
import MessageForm from "./components/messageForm";
import dynamic from 'next/dynamic';
import Loading from "./loading";

const Map = dynamic(() => import('./components/map'), 
    {   ssr: false, 
        loading: () => <Loading />
    });

export default function Home() {
    return (
        <div className="h-screen w-screen max-h-screen">
            <h1 className="text-2xl font-bold w-full p-1 bg-blue-500 text-white">Flight Radar</h1>
            <div className="grid grid-cols-4 gap-2">
                <Map />
                <Chat />
                <FlightTable />
            </div>
        </div>
    );
}
