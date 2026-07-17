import type {
  Athlete,
  FootballAthlete,
  BasketballAthlete,
  MmaAthlete,
  Sport,
} from "../../utils/types.js";

export interface TopPerformer {
  sport: string;
  athleteName: string;
  label: string;
  value: number;
}

export function getTopPerformers(
  athletes: Athlete[],
  sports: Sport[]
): TopPerformer[] {

  const results: TopPerformer[] = [];

  // Football
  const footballPlayers = athletes.filter(
    (a): a is FootballAthlete => a.sport_id === 1
  );

  if (footballPlayers.length > 0) {
    const best = footballPlayers.reduce((current, next) =>
      next.stats.goals > current.stats.goals ? next : current
    );

    results.push({
      sport: sports.find(s => s.id === 1)?.name ?? "Football",
      athleteName: `${best.first_name} ${best.last_name}`,
      label: "Buts",
      value: best.stats.goals,
    });
  }

  // Basketball
  const basketballPlayers = athletes.filter(
    (a): a is BasketballAthlete => a.sport_id === 2
  );

  if (basketballPlayers.length > 0) {
    const best = basketballPlayers.reduce((current, next) =>
      next.stats.points_per_game > current.stats.points_per_game
        ? next
        : current
    );

    results.push({
      sport: sports.find(s => s.id === 2)?.name ?? "Basketball",
      athleteName: `${best.first_name} ${best.last_name}`,
      label: "Points / match",
      value: best.stats.points_per_game,
    });
  }

  // MMA
  const mmaFighters = athletes.filter(
    (a): a is MmaAthlete => a.sport_id === 3
  );

  if (mmaFighters.length > 0) {
    const best = mmaFighters.reduce((current, next) =>
      next.stats.wins > current.stats.wins ? next : current
    );

    results.push({
      sport: sports.find(s => s.id === 3)?.name ?? "MMA",
      athleteName: `${best.first_name} ${best.last_name}`,
      label: "Victoires",
      value: best.stats.wins,
    });
  }

  return results;
}