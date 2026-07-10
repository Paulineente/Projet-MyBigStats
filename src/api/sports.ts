import type { Sport } from "../utils/types.js";
import { notifyError } from "../utils/errors.js";

const SPORTS_URL = "https://keligmartin.github.io/api/sports.json";

export async function fetchSports(): Promise<Sport[]> {
  try {
    const res = await fetch(SPORTS_URL);
    if (!res.ok) {
      throw new Error("Impossible de charger la liste des sports");
    }
    return await res.json();
  } catch (err) {
    notifyError(err);
    return [];
  }
}
