export interface SimplifiedTerm {
  testo: string;
  semplificazione?: string;
  definizione: string;
}

export type SimplifiedResult = [{ contenuto: SimplifiedTerm[] }];
