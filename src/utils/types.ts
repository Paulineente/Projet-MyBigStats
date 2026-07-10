export interface Sport {
  id: number;
  name: string;
}

export interface Athlete {
  id: number;
  name: string;
  sportId: number;
  stats: Record<string, number>;
}

export interface Rencontre {
  id: number;
  sportId: number;
  date: string;
  participants: number[];
}

export interface Equipe {
  id: number;
  name: string;
  sportId: number;
  athleteIds: number[];
}
