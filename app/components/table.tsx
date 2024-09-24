'use client'

import React from "react";
import { useWebSocket } from "../websocket";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/react";

export default function FlightTable() {
    const { flights } = useWebSocket();
    return (
        <div className="max-h-[20%]">
            <Table aria-label="planes">
                <TableHeader>
                    <TableColumn>flight_id</TableColumn>
                    <TableColumn>departure</TableColumn>
                    <TableColumn>departure city</TableColumn>
                    <TableColumn>destination</TableColumn>
                    <TableColumn>destination city</TableColumn>
                    <TableColumn>departure_date</TableColumn>
                </TableHeader>
                <TableBody items={flights}>
                    {(item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.departure.name}</TableCell>
                            <TableCell>{item.departure.city.name}</TableCell>
                            <TableCell>{item.destination.name}</TableCell>
                            <TableCell>{item.destination.city.name}</TableCell>
                            <TableCell>{item.departure_date.toLocaleString('en-US')}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}