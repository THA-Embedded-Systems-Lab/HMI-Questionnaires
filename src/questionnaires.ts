import { Questionnaire } from "./types/Questionnaire";
import { ResponseFormat } from "./types/ResponseFormat";
import { Time } from "./types/Time";

const questionnaires: Questionnaire[] = [
  {
    name: "System Usability Scale",
    short: "SUS",
    metadata: {
      language: ["EN", "DE"],
      scales: [{ name: "Usability" }],
      time: [Time.PostStudy],
      year: 1996,
      items: 10,
    },
    links: {
      website:
        "https://www.researchgate.net/publication/228593520_SUS_A_quick_and_dirty_usability_scale",
    },
  },
  {
    name: "User Experience Questionnaire",
    short: "UEQ",
    metadata: {
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
      time: [Time.PostStudy],
      items: 26,
      responseFormat: ResponseFormat.SemDiff7,
      year: 2005,
      language: [
        "DE",
        "US",
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
    metadata: {
      scales: [{ name: "Hedonic" }, { name: "Pragmatic" }],
      time: [Time.PostStudy],
      items: 8,
      responseFormat: ResponseFormat.SemDiff7,
      year: 2017,
      language: [
        "DE",
        "US",
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
    metadata: {
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
      participantDetails: {
        n: 283,
        type: ["Young", "Elderly"],
      },
      time: [Time.PostStudy],
      language: ["EN", "DE", "NL", "SV", "ES", "FR", "IT", "JA"],
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
    metadata: {
      scales: [
        {
          name: "Comfort",
        },
        {
          name: "Trust",
        },
        {
          name: "Acceptance",
        },
      ],
      time: [Time.PostStudy],
      items: 14,
      language: ["EN", "ES", "DE", "FR", "JA", "CN"],
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
    metadata: {
      scales: [{ name: "Social" }, { name: "Task" }, { name: "Affect" }],
      time: [Time.PreStudy, Time.Standalone],
      language: ["DE", "EN"],
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
    metadata: {
      scales: [
        { name: "Intent of Developers" },
        { name: "Reliability" },
        { name: "Predictability" },
        { name: "Familiarity" },
        { name: "Propensity to Trust" },
        { name: "Trust in Automation" },
      ],
      time: [Time.PostStudy],
      language: ["EN", "DE"],
      items: 19,
      year: 2019,
    },
    links: {
      doi: "https://doi.org/10.1016/j.apergo.2017.07.006",
      git: "https://github.com/moritzkoerber/TiA_Trust_in_Automation_Questionnaire",
    },
  },
  {
    name: "Usability Metric for User Experience",
    short: "UMUX",
    metadata: {
      scales: [
        { name: "Effectiveness" },
        { name: "Efficiency" },
        { name: "Satisfaction" },
      ],
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
    metadata: {
      scales: [
        { name: "Attractiveness" },
        { name: "Efficiency" },
        { name: "Perspicuity" },
      ],
      time: [Time.PostStudy],
      year: 1991,
      language: ["EN"],
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
    metadata: {
      scales: [{ name: "Cognitive Load" }],
      time: [Time.PostStudy],
      year: 1988,
      language: ["EN"],
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
    metadata: {
      scales: [{ name: "Hedonic" }, { name: "Pragmatic" }],
      time: [Time.PostStudy],
      language: ["DE"],
      year: 2003,
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
      time: [Time.Standalone],
      language: ["EN"],
      year: 2023,
    },
    links: {
      doi: "https://doi.org/10.3389/frai.2023.1249322",
    },
    notes: [
      "For each scale, Cronbach's alpha is computed from the average post-study test scores across all groups to facilitate simplified reporting.",
    ],
  },
];

export default questionnaires;
