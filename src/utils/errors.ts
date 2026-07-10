export function notifyError(err: unknown): void {
  const box = document.createElement("div");
  box.className = "error";

  const message = err instanceof Error ? err.message : "Erreur inconnue";
  box.textContent = message;

  document.body.appendChild(box);
  setTimeout(() => box.remove(), 5000);
}
