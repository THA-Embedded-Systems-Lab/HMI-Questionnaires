import { Questionnaire } from "./types/Questionnaire";
import { ResponseFormat } from "./types/ResponseFormat";
import { Time } from "./types/Time";

const questionnaires: Questionnaire[] = [
  {
    name: "System Usability Scale",
    short: "SUS",
    data: [
      {
        language: "EN",
        scales: [{ name: "Usability" }],
      },
    ],
    metadata: {
      time: [Time.PostStudy],
      year: 1996,
      items: 10,
      languages: ["EN", "DE"],
    },
    links: {
      website:
        "https://www.researchgate.net/publication/228593520_SUS_A_quick_and_dirty_usability_scale",
    },
  },
  {
    name: "User Experience Questionnaire",
    short: "UEQ",
    data: [
      {
        language: "EN",
        scales: [
          { name: "Attractiveness" },
          { name: "Perspicuity" },
          { name: "Efficiency" },
          { name: "Dependability" },
          { name: "Stimulation" },
          { name: "Novelty" },
          { name: "Hedonic" },
          { name: "Pragmatic" },
        ],
      },
    ],
    metadata: {
      time: [Time.PostStudy],
      items: 26,
      responseFormat: ResponseFormat.SemDiff7,
      year: 2005,
      languages: [
        "DE",
        "EN",
        "ES",
        "PT",
        "TR",
        "ID",
        "ZH",
        "FR",
        "IT",
        "JA",
        "NL",
        "RU",
        "EE",
        "SI",
        "SV",
        "PL",
        "EL",
        "HI",
        "FA",
        "BG",
        "CS",
        "MS",
        "TH",
        "DA",
        "BN",
        "HE",
        "KN",
        "MR",
        "TA",
        "AR",
        "BS",
        "HR",
        "FI",
        "HU",
        "NO",
        "SK",
        "KO",
      ],
    },
    links: {
      website: "https://www.ueq-online.org",
      doi: "https://doi.org/10.1007/978-3-540-89350-9_6",
    },
  },
  {
    name: "User Experience Questionnaire - Short",
    short: "UEQ-S",
    data: [
      {
        language: "EN",
        scales: [
          { name: "Hedonic", cronbachsAlpha: 0.81 },
          { name: "Pragmatic", cronbachsAlpha: 0.85 },
        ],
        participantDetails: {
          n: 31,
          type: ["Students"],
        },
      },
    ],
    metadata: {
      time: [Time.PostStudy],
      items: 8,
      responseFormat: ResponseFormat.SemDiff7,
      year: 2017,
      languages: [
        "DE",
        "EN",
        "ES",
        "PT",
        "TR",
        "ID",
        "ZH",
        "FR",
        "IT",
        "JA",
        "NL",
        "RU",
        "EE",
        "SI",
        "SV",
        "PL",
        "EL",
        "HI",
        "FA",
        "BG",
        "CS",
        "MS",
        "TH",
        "DA",
        "BN",
        "HE",
        "KN",
        "MR",
        "TA",
        "AR",
        "BS",
        "HR",
        "FI",
        "HU",
        "NO",
        "SK",
        "KO",
      ],
    },
    links: {
      website: "https://www.ueq-online.org",
      doi: "http://dx.doi.org/10.9781/ijimai.2017.09.001",
    },
  },
  {
    name: "System Acceptance Scale",
    short: "Accept. Scale",
    data: [
      {
        language: "EN",
        participantDetails: {
          n: 283,
          type: ["Young", "Elderly"],
        },
        scales: [
          {
            name: "Usefulness",
            cronbachsAlpha: 0.813,
          },
          {
            name: "Satisfying",
            cronbachsAlpha: 0.855,
          },
        ],
      },
    ],
    metadata: {
      time: [Time.PostStudy],
      languages: ["EN", "DE", "NL", "SV", "ES", "FR", "IT", "JA"],
      year: 1997,
      items: 9,
      responseFormat: ResponseFormat.SemDiff5,
    },
    links: {
      doi: "https://doi.org/10.1016/s0968-090x(96)00025-3",
      website: "https://www.hfes-europe.org/accept/accept.htm",
    },
    domain: ["Automotive", "In-vehicle systems"],
    notes: [
      "For each scale, Cronbach's alpha is computed from the average post-study test scores across all groups to facilitate simplified reporting.",
    ],
  },
  {
    name: "Negative Attitude toward Robots Scale",
    short: "NARS",
    data: [
      {
        language: "EN",
        scales: [
          { name: "Comfort" },
          { name: "Trust" },
          { name: "Acceptance" },
        ],
      },
    ],
    metadata: {
      time: [Time.PostStudy],
      items: 14,
      languages: ["EN", "ES", "DE", "FR", "JA", "CN"],
      year: 2006,
      responseFormat: ResponseFormat.Likert5,
    },
    links: {
      doi: "https://psycnet.apa.org/doi/10.1037/t57930-000",
      website:
        "https://www.bartneck.de/2019/03/11/negative-attitudes-towards-robots-scale-nars-translations/",
    },
    notes: [
      "The scales are usually negative for this questionnaire, but for filtering, we invert them for better visibility.",
    ],
  },
  {
    name: "Attitudes toward Cooperative Industrial Robots Questionnaire",
    short: "ACIR-Q",
    data: [
      {
        language: "EN",
        scales: [{ name: "Social" }, { name: "Task" }, { name: "Affect" }],
      },
    ],
    metadata: {
      time: [Time.PreStudy, Time.Standalone],
      languages: ["DE", "EN"],
      items: 12,
      year: 2022,
    },
    links: {
      doi: "https://doi.org/10.1007/s12369-023-00996-0",
      osf: "https://osf.io/5fnr9/",
    },
    domain: ["Robot"],
  },
  {
    name: "Trust in Automation Questionnaire",
    short: "TiA",
    data: [
      {
        language: "EN",
        scales: [
          { name: "Intent of Developers" },
          { name: "Reliability" },
          { name: "Predictability" },
          { name: "Familiarity" },
          { name: "Propensity to Trust" },
          { name: "Trust in Automation" },
        ],
      },
      {
        language: "DE",
        scales: [
          { name: "Intent of Developers" },
          { name: "Reliability" },
          { name: "Predictability" },
          { name: "Familiarity" },
          { name: "Propensity to Trust" },
          { name: "Trust in Automation" },
        ],
      },
    ],
    metadata: {
      time: [Time.PostStudy],
      items: 19,
      year: 2019,
      languages: ["EN", "DE"],
    },
    links: {
      doi: "https://doi.org/10.1016/j.apergo.2017.07.006",
      git: "https://github.com/moritzkoerber/TiA_Trust_in_Automation_Questionnaire",
    },
  },
  {
    name: "Usability Metric for User Experience",
    short: "UMUX",
    data: [
      {
        language: "EN",
        scales: [
          { name: "Effectiveness" },
          { name: "Efficiency" },
          { name: "Satisfaction" },
        ],
      },
    ],
    metadata: {
      languages: ["EN", "DE"],
      time: [Time.PostStudy],
      items: 4,
      year: 2010,
    },
    links: {
      doi: "https://doi.org/10.1016/j.intcom.2010.04.004",
    },
  },
  {
    name: "Post-Study-Scenario Questionnaire",
    short: "ASQ",
    data: [
      {
        language: "EN",
        scales: [
          { name: "Attractiveness" },
          { name: "Efficiency" },
          { name: "Perspicuity" },
        ],
      },
    ],
    metadata: {
      time: [Time.PostStudy],
      year: 1991,
      languages: ["EN"],
      items: 3,
      responseFormat: ResponseFormat.Likert7,
    },
    links: {
      doi: "https://doi.org/10.1145/122672.122692",
    },
  },
  {
    name: "NASA Task Load Index",
    short: "NASA-TLX",
    data: [
      {
        language: "EN",
        scales: [{ name: "Cognitive Load" }],
      },
    ],
    metadata: {
      time: [Time.PostStudy],
      year: 1988,
      languages: ["EN"],
      items: 6,
    },
    links: {
      doi: "https://doi.org/10.1016/s0166-4115(08)62386-9",
      website:
        "https://humansystems.arc.nasa.gov/groups/tlx/tlxpaperpencil.php",
    },
  },
  {
    name: "AttrakDiff: Ein Fragebogen zur Messung wahrgenommener hedonischer und pragmatischer Qualität",
    short: "AttrakDiff",
    data: [
      {
        language: "DE",
        scales: [{ name: "Hedonic" }, { name: "Pragmatic" }],
      },
    ],
    metadata: {
      time: [Time.PostStudy],
      languages: ["DE"],
      year: 2003,
      responseFormat: ResponseFormat.SemDiff7,
    },
    links: {
      doi: "https://doi.org/10.1007/978-3-322-80058-9_19",
    },
  },
  {
    name: "Psychological assessment of AI-based decision support systems",
    short: "PAAI",
    metadata: {
      items: 39,
      time: [Time.Standalone],
      languages: ["EN"],
      year: 2023,
    },
    data: [
      {
        language: "EN",
        scales: [
          {
            name: "System Characteristics",
            cronbachsAlpha: 0.84,
          },
          {
            name: "Task Characteristics",
            cronbachsAlpha: 0.79,
          },
          {
            name: "Job Characteristics",
            cronbachsAlpha: 0.88,
          },
        ],
        participantDetails: {
          n: 471,
          type: ["Prolific", "UK/US"],
        },
      },
    ],
    links: {
      doi: "https://doi.org/10.3389/frai.2023.1249322",
    },
    notes: [
      "For each scale, Cronbach's alpha is computed from the average post-study test scores across all groups to facilitate simplified reporting.",
    ],
  },
];

export default questionnaires;
