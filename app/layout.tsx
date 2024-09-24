'use client'
import { WebSocketProvider } from "./websocket";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";

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
                        {children}
                    </WebSocketProvider>
                </NextUIProvider>
            </body>
        </html>
    );
}
