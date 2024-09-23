export type Message = {
    flight_id: string, // Id del vuelo que envía el mensaje
    level: 'info'|'warn', // Tipo de mensaje (enum)
    name: string, // Nombre de quién envía el mensaje
    date: Date, // Fecha y hora del mensaje
    content: string // Contenido del mensaje
}

export type MessageEvent = {
    type: 'message', // Nombre de evento
    message: Message // Mensaje
}

export type ChatEvent = {
    type: 'chat' // Nombre de evento
    content: string // Contenido del mensaje
}
    