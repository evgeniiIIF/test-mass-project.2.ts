export interface Game {
  name: string;
  bestResult: number;
  isPlayed: boolean;
  limitGameResult?: number;
}

export interface Stage {
  name: string;
  id: number;
  thresholdPoints: number;
  games: Game[];
  isCurrent?: boolean;
  isFirstStage?: boolean;
  isLastStage?: boolean;
}

export interface StagesState {
  stages: Stage[];
  stagesOriginal: Stage[];
  totalBestResult: number;
}
