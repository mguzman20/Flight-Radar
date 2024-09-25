'use client'

import React from "react";
import { useWebSocket } from "../websocket";
import MessageForm from "./messageForm";
import { format } from 'date-fns/format';

export default function Chat() {
    const { messages } = useWebSocket();
    return (
        <div className="border rounded col-span-1">
            <div className="p-2 bg-gray-200">Chat</div>
            <div className="flex-col overflow-y-auto">
                {messages.map((message, index) => (
                    <div key={index} className={`rounded-lg m-1 p-1 ${message.level === 'info' ? 'bg-blue-300' : 'bg-orange-300'}`}>
                        <div className="flex flex-col">
                            <span className="text-black font-bold">{message.name}</span>
                            <span className="">{message.content}</span>
                            <span className="text-gray-500 text-xs"> {format(message.date, "yyyy-MM-dd hh:mm")}</span>
                        </div>
                    </div>
                ))}
            </div>
            <MessageForm />
        </div>
    );
}