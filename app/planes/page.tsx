'use client'

import React from "react";
import { useWebSocket } from "../websocket";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/react";

export default function Planes() {
    const { planes } = useWebSocket();
    return (
        <div>
            <h1>Planes</h1>
            <Table aria-label="planes">
                <TableHeader>
                    <TableColumn>flight_id</TableColumn>
                    <TableColumn>airline</TableColumn>
                    <TableColumn>captain</TableColumn>
                    <TableColumn>position</TableColumn>
                    <TableColumn>heading</TableColumn>
                    <TableColumn>ETA</TableColumn>
                    <TableColumn>distance</TableColumn>
                    <TableColumn>status</TableColumn>
                </TableHeader>
                <TableBody items={planes}>
                    {(item) => (
                        <TableRow key={item.flight_id}>
                            <TableCell>{item.flight_id}</TableCell>
                            <TableCell>{item.airline.name}</TableCell>
                            <TableCell>{item.captain}</TableCell>
                            <TableCell>{item.position.lat}, {item.position.long}</TableCell>
                            <TableCell>{item.heading.lat}, {item.heading.long}</TableCell>
                            <TableCell>{item.ETA}</TableCell>
                            <TableCell>{item.distance}</TableCell>
                            <TableCell>{item.status}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}