'use client'
import { WebSocketProvider } from "./websocket";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Navbar from "./navbar";

export default function RootLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body >
                <NextUIProvider>
                    <WebSocketProvider>
                        <div style={{ height: '100svh' }} className="flex flex-col items-stretch min-h-screen">
                            <Navbar />
                            {children}
                        </div>
                    </WebSocketProvider>
                </NextUIProvider>
            </body>
        </html>
    );
}
