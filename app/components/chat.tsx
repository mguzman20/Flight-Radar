'use client'

import React from "react";
import { useWebSocket } from "../websocket";

export default function Chat() {
    const { messages } = useWebSocket();
    return (
        <div className="border rounded w-full">
            <div className="p-2 bg-gray-200">Chat</div>
            <div className="flex-col">
                {messages.map((message, index) => (
                    <div key={index} className={`rounded-lg m-1 p-1 ${message.level === 'info' ? 'bg-blue-300' : 'bg-orange-300'}`}>
                        <div className="flex flex-col">
                            <span className="text-black font-bold">{message.name}</span>
                            <span className="">{message.content}</span>
                            <span className="text-gray-500 text-xs"> {message.date.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '')}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}