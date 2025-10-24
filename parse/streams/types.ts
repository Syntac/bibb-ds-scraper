
export type Interface1 = {
  id: number,
  url: string,
  html: string
}

export type Interface2 = {
  id: number,
  url: string,
} & Record<typeof Interface2Keys[number], string | null>

export const Interface2Keys = [
  "Anbieter",
  "Bezeichnung des dualen Studiengangs",
  "Abschluss / Titel",
  "Hochschulart",
  "Format des Studiengangs",
  "Organisationsform des Anbieters",
  "Art des dualen Studiengangs",
  "Studieninhalte",
  "Ablauf",
  "Veranstaltungsort",
  "Studiengang existiert seit",
  "Beginn",
  "Studiendauer",
  "Studierende in diesem Studiengang",
  // "Absolventen in diesem Studiengang",
  "Internationalität",
  "Zugangsvoraussetzungen",
  "Akkreditierung",
  "Prüfung",
  "Weitere Anmerkungen zum dualen Studiengang",
  "Informationen zur Hochschule",
  "Bewerbungsfrist",
  "Plätze zum nächsten Bewerbungstermin",
] as const;