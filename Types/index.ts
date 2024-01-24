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
