"use client"; // Ensure this context is a Client Component

import { Flight } from '@/types/Flight';
import { Plane, TakeoffEvent, LandingEvent, CrashedEvent } from '@/types/Plane';
import { Message } from '@/types/Message';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ReactNode } from 'react';

interface WebSocketContextType {
    flights: Flight[];
    planes: Plane[];
    landings: string[];
    takeoffs: string[];
    crashes: string[];
    messages: Message[];
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
    const [messages, setMessages] = useState<Message[]>([]);
    const [flights, setFlights] = useState<Flight[]>([]);
    const [planes, setPlanes] = useState<Plane[]>([]);
    const [takeoffs, setTakeoffs] = useState<string[]>([]);
    const [landings, setLandings] = useState<string[]>([]);
    const [crashes, setCrashes] = useState<string[]>([]);
    
    const studentId = '20642431'; // Replace with your student ID
    const username = 'm.gguzman'; // Optional

    useEffect(() => {
        const websocket = new WebSocket('wss://tarea-2.2024-2.tallerdeintegracion.cl/connect');

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
            case 'flights':
                // Update flights state
                setFlights((prevFlights) => {
                    // Create a map for existing flights for easier lookup
                    const updatedFlights = [...prevFlights];

                    // Iterate over the incoming flights
                    Object.entries(data.flights).forEach(([flight_id, flight]) => {
                    // Find the index of the existing flight
                        const index = updatedFlights.findIndex(f => f.id === flight_id);

                        if (index !== -1) {
                        // If flight exists, update it
                            updatedFlights[index] = flight as Flight;
                        } else {
                        // If flight does not exist, add it
                            updatedFlights.push(flight as Flight);
                        }
                    });

                    return updatedFlights;
                });
                break;

            case 'plane':
                // Update planes state
                setPlanes((prevPlanes) => {
                    const existingPlaneIndex = prevPlanes.findIndex(plane => plane.flight_id === data.plane.flight_id);
                    if (existingPlaneIndex !== -1) {
                        // Update existing plane
                        const updatedPlanes = [...prevPlanes];
                        updatedPlanes[existingPlaneIndex] = data.plane;
                        return updatedPlanes;
                    } else {
                        // Add new plane
                        return [...prevPlanes, data.plane];
                    }
                });
                break;

            case 'takeoff':
                // Update takeoffs state
                setTakeoffs((prevTakeoffs) => [...prevTakeoffs, data.flight_id]);
                break;

            case 'landing':
                // Handle landing events if needed
                setLandings((prevLandings) => [...prevLandings, data.flight_id]);
                break;

            case 'crash':
                // Handle crash events if needed
                setCrashes((prevCrashes) => [...prevCrashes, data.flight_id]);
                break;

            case 'message':
                // Update messages state
                setMessages((prevMessages) => [...prevMessages, data.message]);
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