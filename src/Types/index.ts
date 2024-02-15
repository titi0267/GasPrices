export type BottomTabParamList = {
  Map: {start: string; end: string} | undefined;
  Search: undefined;
  GasPumps: undefined;
};

export interface MapRouteParams {
  start: string;
  end: string;
}

export interface LocationType {
  latitude: number;
  longitude: number;
}

export interface GasPumpInformation {
  address: string;
  price: string;
  gasType: string;
  coords: [number, number];
}

export interface GasPumpsRouteParams {
  gasPumps: GasPumpInformation[];
}

export interface GasPumpFields {
  adresse: string;
  carburants_disponibles: string;
  carburants_indisponibles: string;
  code_departement: string;
  departement: string;
  e10_maj: string;
  e10_prix: string;
  gazole_maj: string;
  gazole_prix: string;
  id: number;
  latitude: string;
  longitude: number;
  region: string;
  sp98_maj: string;
  sp98_prix: string;
  ville: string;
}

export interface GasPump {
  fields: GasPumpFields;
  geometry: {
    coordinates: [number, number];
    type: string;
  };
  recordid: string;
}

export type CityPosition = {label: string; geometry: string};

export type GasType =
  | 'SP95-E10'
  | 'E5'
  | 'SP95-E5'
  | 'SP98-E5'
  | 'Gasoil'
  | 'GPL'
  | 'Ethanol';
