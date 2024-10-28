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
  averagePrice: number;
  priceChange: number;
  lowestPrice: number;
  bestTime: string;
}

export declare interface PredictTrendData {
  month: string;
  price: number;
  predicted: number;
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
