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
            <body>
                <NextUIProvider>
                    <WebSocketProvider>
                        <Navbar />
                        {children}
                    </WebSocketProvider>
                </NextUIProvider>
            </body>
        </html>
    );
}
