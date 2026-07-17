import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { ThemeProvider } from "../contexts/ThemeProvider";
import type { Questionnaire } from "../types/Questionnaire";
import { Time } from "../types/Time";

// Render a component inside the ThemeProvider (required by useTheme consumers).
export function renderWithTheme(ui: ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

// Small, valid fixtures used across component tests.
export const sampleQuestionnaires: Questionnaire[] = [
  {
    name: "System Usability Scale",
    short: "SUS",
    data: [
      {
        language: "EN",
        scales: [{ name: "Usability", cronbachsAlpha: 0.91 }],
      },
    ],
    metadata: {
      time: [Time.PostStudy],
      year: 1996,
      items: 10,
      languages: ["EN", "DE"],
    },
    links: {
      doi: [{ title: "SUS DOI", url: "https://doi.org/10.0/sus" }],
    },
  },
  {
    name: "NASA Task Load Index",
    short: "NASA-TLX",
    data: [
      {
        language: "EN",
        scales: [
          { name: "Mental Demand" },
          { name: "Physical Demand" },
        ],
      },
    ],
    metadata: {
      time: [Time.PostStudy],
      year: 1988,
      items: 6,
      languages: ["EN"],
    },
  },
];
