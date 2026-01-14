import { Time } from "./Time";
import { ResponseFormat } from "./ResponseFormat";

export type Questionnaire = {
  name: string;
  short: string;
  data: data[];
  license?: string;
  metadata: Metadata;
  links?: Record<string, { title: string; url: string }[]>;
  domain?: string[];
  notes?: string[];
};

export type Metadata = {
  responseFormat?: ResponseFormat;
  time: Time[];
  year?: number;
  items?: number;
  languages: string[];
};

export type data = {
  language: string;
  participantDetails?: {
    n: number;
    type: string[];
  };
  scales: Scale[];
};

export type Scale = {
  name: string;
  cronbachsAlpha?: number;
};
