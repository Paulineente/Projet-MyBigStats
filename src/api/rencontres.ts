import type { Rencontre } from "../utils/types";
import { notifyError } from "../utils/errors";

const RENCONTRES_URL = "https://keligmartin.github.io/api/rencontres.json";

export async function fetchRencontres(): Promise<Rencontre[]> {
  try {
    const res = await fetch(RENCONTRES_URL);
    if (!res.ok) {
      throw new Error("Impossible de charger la liste des rencontres");
    }
    return await res.json();
  } catch (err) {
    notifyError(err);
    return [];
  }
}
