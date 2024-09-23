"use client"; // Ensure this context is a Client Component

import { FlightsEvents } from '@/types/Flight';
import { PlaneEvent, TakeoffEvent, LandingEvent, CrashedEvent } from '@/types/Plane';
import { MessageEvent } from '@/types/Message';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ReactNode } from 'react';

interface WebSocketContextType {
    flights: FlightsEvents[];
    planes: PlaneEvent[];
    landings: LandingEvent[];
    takeoffs: TakeoffEvent[];
    crashes: CrashedEvent[];
    messages: MessageEvent[];
}

const defaultContextValue: WebSocketContextType = {
    flights: [],
    planes: [],
    landings: [],
    takeoffs: [],
    crashes: [],
    messages: []
};

const WebSocketContext = createContext<WebSocketContextType>(defaultContextValue);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
    const [messages, setMessages] = useState<MessageEvent[]>([]);
    const [flights, setFlights] = useState<FlightsEvents[]>([]);
    const [planes, setPlanes] = useState<PlaneEvent[]>([]);
    const [takeoffs, setTakeoffs] = useState<TakeoffEvent[]>([]);
    const [landings, setLandings] = useState<LandingEvent[]>([]);
    const [crashes, setCrashes] = useState<CrashedEvent[]>([]);
    
    const studentId = '123456'; // Replace with your student ID
    const username = 'YourUsername'; // Optional

    useEffect(() => {
        const websocket = new WebSocket('wss://tarea-2.2024-2.tallerdeintegracion.cl1/connect');

        websocket.onopen = () => {
            console.log('Connected to WebSocket server');
            const joinEvent = {
                type: 'join',
                id: studentId,
                username: username,
            };
            websocket.send(JSON.stringify(joinEvent));
        };

        websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            switch (data.type) {
                case 'flight':
                    // Update flights state
                    setFlights((prevFlights) => [...prevFlights, data]);
                    break;

                case 'plane':
                    // Update planes state
                    setPlanes((prevPlanes) => [...prevPlanes, data]);
                    break;

                case 'takeoff':
                    // Update takeoffs state
                    setTakeoffs((prevTakeoffs) => [...prevTakeoffs, data]);
                    break;

                case 'landing':
                    // Handle landing events if needed
                    setLandings((prevLandings) => [...prevLandings, data]);
                    break;

                case 'crash':
                    // Handle crash events if needed
                    setCrashes((prevCrashes) => [...prevCrashes, data]);
                    break;

                case 'message':
                    // Update messages state
                    setMessages((prevMessages) => [...prevMessages, data]);
                    break;

                default:
                    console.warn(`Unknown event type: ${data.type}`);
            }
        };

        websocket.onerror = (event) => {
            console.error('WebSocket error observed:', event);
        };

        websocket.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        return () => {
            websocket.close();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ flights, planes, landings, takeoffs, crashes, messages }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};