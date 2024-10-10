'use client'

import React from "react";
import { useWebSocket } from "../websocket";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/react";
import { format } from 'date-fns/format';

export default function FlightTable() {
    const { flights } = useWebSocket();
    return (
        <div className="col-span-4">
            <Table aria-label="planes"
                classNames={{
                    'base': 'overflow-y-auto',
                }}
                removeWrapper={true}
            >
                <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>Salida</TableColumn>
                    <TableColumn>Ciudad de Salida</TableColumn>
                    <TableColumn>Destino</TableColumn>
                    <TableColumn>Ciudad de destino</TableColumn>
                    <TableColumn>Fecha y hora</TableColumn>
                </TableHeader>
                <TableBody items={flights}>
                    {(item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.departure.name}</TableCell>
                            <TableCell>{item.departure.city.name}</TableCell>
                            <TableCell>{item.destination.name}</TableCell>
                            <TableCell>{item.destination.city.name}</TableCell>
                            <TableCell>{format(item.departure_date, "yyyy-MM-dd hh:mm")}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}