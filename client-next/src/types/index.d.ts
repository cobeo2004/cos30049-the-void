export declare type User = {
  id: string;
  username: string;
  password: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
};
export declare type LoginResult = {
  access_token: string;
  refresh_token: string;
  user: User;
};

export declare interface Flight {
  id: string;
  airline: string;
  route: string;
  date: string;
  price: string;
  source: string;
}

export declare interface PredictStatistics {
  predictedPrice: number;
  confidence: number;
  priceChange: number;
  lastUpdated: string;
}

export declare interface PredictTrendData {
  month: string;
  price: number;
}

export declare interface PredictDistributionData {
  range: string;
  count: number;
}

export declare interface PredictSeasonalityData {
  month: string;
  demand: number;
  price: number;
}

export declare interface PredictResults {
  statistics: PredictStatistics;
  trendData: Array<PredictTrendData | null>;
  distributionData: Array<PredictDistributionData | null>;
  seasonalityData: Array<PredictSeasonalityData | null>;
}

declare type SerpSearchMetadata = {
  id: string;
  status: string;
  json_endpoint: string;
  created_at: string;
  processed_at: string;
  google_flights_url: string;
  raw_html_file: string;
  prettify_html_file: string;
  total_time_taken: number;
};

declare type SerpSearchParameters = {
  engine: string;
  hl: string;
  gl: string;
  departure_id: string;
  arrival_id: string;
  outbound_date: string;
  return_date: string;
  currency: string;
};

declare type SerpFlight = {
  departure_airport: {
    name: string;
    id: string;
    time: string;
  };
  arrival_airport: {
    name: string;
    id: string;
    time: string;
  };
  duration: number;
  airplane: string;
  airline: string;
  airline_logo: string;
  travel_class: string;
  flight_number: string;
  legroom: string;
  extensions: Array<string>;
  often_delayed_by_over_30_min?: boolean;
};

declare type SerpBestFlight = {
  flights: Array<SerpFlight>;
  total_duration: number;
  carbon_emissions: {
    this_flight: number;
    typical_for_this_route: number;
    difference_percent: number;
  };
  price: number;
  type: string;
  airline_logo: string;
  extensions: Array<string>;
  departure_token: string;
};

declare type SerpAirportDetail = {
  airport: {
    id: string;
    name: string;
  };
  city: string;
  country: string;
  country_code: string;
  image: string;
  thumbnail: string;
};

declare type SerpAirport = {
  departure: Array<SerpAirportDetail>;
  arrival: Array<SerpAirportDetail>;
};

export declare type SerpResponse = {
  search_metadata: SerpSearchMetadata;
  search_parameters: SerpSearchParameters;
  best_flights: Array<SerpBestFlight>;
  airports: Array<SerpAirport>;
};

export declare type ChartsData = {
  price_distribution: {
    range: string;
    count: number;
  }[];
  price_trend: {
    month: string;
    price: number;
  }[];
  seasonal_analysis: {
    month: string;
    demand: number;
    price: number;
  }[];
};
