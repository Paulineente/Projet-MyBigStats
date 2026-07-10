export interface CompetitionTeamSport {
  name: string;
  host_country: string;
  start_date: string;
  end_date: string;
  number_of_teams: number;
  format: string;
  venue?: never;
  date?: never;
}

export interface CompetitionIndividualSport {
  name: string;
  host_country: string;
  venue: string;
  date: string;
  format: string;
  start_date?: never;
  end_date?: never;
  number_of_teams?: never;
}

export type Competition = CompetitionTeamSport | CompetitionIndividualSport;

export interface Sport {
  id: number;
  name: string;
  slug: string;
  type: "team" | "individual";
  players_per_team: number;
  match_duration_minutes: number;
  governing_body: string;
  competition: Competition;
}

export interface FootballAthleteStats {
  matches_played: number;
  goals: number;
  assists: number;
  yellow_cards: number;
  red_cards: number;
  minutes_played: number;
}

export interface BasketballAthleteStats {
  games_played: number;
  points_per_game: number;
  rebounds_per_game: number;
  assists_per_game: number;
  steals_per_game: number;
  blocks_per_game: number;
  field_goal_percentage: number;
  three_point_percentage: number;
  free_throw_percentage: number;
  minutes_per_game: number;
}

export interface MmaAthleteStats {
  wins: number;
  losses: number;
  draws: number;
  no_contests: number;
  wins_by_ko: number;
  wins_by_submission: number;
  wins_by_decision: number;
  title_defenses: number;
}

export interface FootballAthlete {
  id: number;
  sport_id: 1;
  team_id: number;
  first_name: string;
  last_name: string;
  nationality: string;
  birth_date: string;
  height_cm: number;
  weight_kg: number;
  position: string;
  jersey_number: number;
  stats: FootballAthleteStats;
}

export interface BasketballAthlete {
  id: number;
  sport_id: 2;
  team_id: number;
  first_name: string;
  last_name: string;
  nationality: string;
  birth_date: string;
  height_cm: number;
  weight_kg: number;
  position: string;
  jersey_number: number;
  stats: BasketballAthleteStats;
}

export interface MmaAthlete {
  id: number;
  sport_id: 3;
  team_id: null;
  first_name: string;
  last_name: string;
  nickname: string | null;
  nationality: string;
  birth_date: string;
  height_cm: number;
  weight_kg: number;
  reach_cm: number;
  weight_class: string;
  stance: string;
  stats: MmaAthleteStats;
}

export type Athlete = FootballAthlete | BasketballAthlete | MmaAthlete;

export interface FootballScorer {
  athlete_id: number;
  minute: number;
}

export interface FootballRencontre {
  id: number;
  sport_id: 1;
  type: "match";
  stage: string;
  date: string;
  home_team_id: number;
  away_team_id: number;
  home_score: number;
  away_score: number;
  venue: string;
  attendance: number;
  status: "finished";
  scorers: FootballScorer[];
}

export interface BasketballQuarterScores {
  home: number[];
  away: number[];
}

export interface BasketballRencontre {
  id: number;
  sport_id: 2;
  type: "match";
  playoff_round: string;
  game_number: number;
  series: string;
  date: string;
  home_team_id: number;
  away_team_id: number;
  home_score: number;
  away_score: number;
  venue: string;
  attendance: number;
  status: "finished";
  quarter_scores: BasketballQuarterScores;
}

export interface MmaRencontre {
  id: number;
  sport_id: 3;
  type: "combat";
  card_position: string;
  date: string;
  fighter1_id: number;
  fighter2_id: number;
  winner_id: number;
  method: string;
  round: number;
  time: string;
  weight_class: string;
  venue: string;
  title_fight: boolean;
  status: "finished";
}

export type Rencontre = FootballRencontre | BasketballRencontre | MmaRencontre;

export interface FootballEquipe {
  id: number;
  sport_id: 1;
  name: string;
  short_name: string;
  country: string;
  confederation: string;
  fifa_ranking: number;
  world_cup_titles: number;
  world_cup_appearances: number;
  coach: string;
  group: string;
}

export interface BasketballEquipe {
  id: number;
  sport_id: 2;
  name: string;
  short_name: string;
  city: string;
  conference: string;
  seed: number;
  regular_season_wins: number;
  regular_season_losses: number;
  coach: string;
  championships: number;
  arena: string;
}

export type Equipe = FootballEquipe | BasketballEquipe;
