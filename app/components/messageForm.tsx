'use client'


import React from "react";

import { useWebSocket } from "../websocket";


export default function MessageForm() {

    

    return (
        <form className="flex flex-row">
            <input type="text" name="message" className="w-4/5 border rounded p-2" placeholder="Enter message" />
            <button type="submit" className="w-1/5 bg-blue-500 text-white p-2 rounded">Send</button>
        </form>
    );
}