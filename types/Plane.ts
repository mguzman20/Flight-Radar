export type Airline = {
    id: string; // Id de la aerolínea
    name: string; // Nombre de la aerolínea
  };
  
export type Coordinates = {
    // Coordenadas, representan un punto en el mapa
    lat: number; // Latitud de las coordenadas
    long: number; // Longitud de las coordenadas
  };
  
export type Plane = {
    // Avión
    flight_id: string; // Vuelo actual de este avión
    airline: Airline; // Aerolínea del vuelo
    captain: string; // Nombre del Capitán del vuelo
    position: Coordinates; // Posición actual del avión
    heading: Coordinates; // Dirección hacia donde se dirige
    ETA: number; // Fecha de llegada estimada
    distance: number; // Distancia estimada al destino
    arrival: Date; // Fecha original de llegada
    status: 'take-off' | 'flying' | 'crashed' | 'arrived'; // Status del avión (enum)
};

export type PlaneEvent = {
    // Evento de avión
    type: 'plane'; // Nombre de evento
    plane: Plane; // Objeto avión
};

export type TakeoffEvent = {
    type: 'take-off' // Nombre de evento
    flight_id: string // Id del vuelo que acaba de despegar
}

export type LandingEvent = {
    type: 'landing' // Nombre de evento
    flight_id: string // Id del vuelo que acaba de aterrizar
}

export type CrashedEvent = {
    type: 'crashed' // Nombre de evento
    flight_id: string // Id del vuelo que acaba de accidentarse
}
  