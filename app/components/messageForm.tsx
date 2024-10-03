'use client'


import React from "react";

import { useWebSocket } from "../websocket";


export default function MessageForm() {
    const { sendEvent } = useWebSocket();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const message = formData.get('message') as string;
        if (message) {
            sendEvent({
                type: 'chat',
                content: message,
            });
            form.reset();
        }
    }
    

    return (
        <form onSubmit={handleSubmit}  className="flex flex-row">
            <input type="text" name="message" className="w-4/5 border rounded p-2" placeholder="Enter message" />
            <button type="submit" className="w-1/5 bg-blue-500 text-white p-2 rounded">Send</button>
        </form>
    );
}