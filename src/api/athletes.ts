import type { Athlete } from "../utils/types.js";
import { notifyError } from "../utils/errors.js";

const ATHLETES_URL = "https://keligmartin.github.io/api/athletes.json";

export async function fetchAthletes(): Promise<Athlete[]> {
  try {
    const res = await fetch(ATHLETES_URL);
    if (!res.ok) {
      throw new Error("Impossible de charger la liste des athlètes");
    }
    return await res.json();
  } catch (err) {
    notifyError(err);
    return [];
  }
}
