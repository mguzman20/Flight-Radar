export type Coordinates = {
  // Coordenadas, representan un punto en el mapa
  lat: number; // Latitud de las coordenadas
  long: number; // Longitud de las coordenadas
};

export type Country = {
  id: string; // Id del país
  name: string; // Nombre del país
};

export type City = {
  id: string; // Id de la ciudad
  name: string; // Nombre de la ciudad
  country: Country; // País donde se encuentra la ciudad
};

export type Airport = {
  id: string; // Id del aeropuerto
  name: string; // Nombre del aeropuerto
  city: City; // Ciudad donde se encuentra el aeropuerto
  location: Coordinates; // Coordenadas geográficas del aeropuerto
};

export type Flight = {
  id: string; // Id del vuelo
  departure: Airport; // Aeropuerto de salida
  destination: Airport; // Aeropuerto de destino
  departure_date: Date; // Fecha de salida
};

export type FlightsEvents = {
  type: 'flights'; // Nombre de evento
  flights: {
    [flight_id: string]: Flight; // Diccionario con los vuelos activos,
    // donde la llave corresponde al id
  };
};
