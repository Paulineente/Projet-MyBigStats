import type { Equipe } from "../utils/types";
import { notifyError } from "../utils/errors";

const EQUIPES_URL = "https://keligmartin.github.io/api/equipes.json";

export async function fetchEquipes(): Promise<Equipe[]> {
  try {
    const res = await fetch(EQUIPES_URL);
    if (!res.ok) {
      throw new Error("Impossible de charger la liste des équipes");
    }
    return await res.json();
  } catch (err) {
    notifyError(err);
    return [];
  }
}
