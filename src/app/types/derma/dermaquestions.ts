import { Client } from '@interface/client';

export interface DermaQuestions {
  id: string | undefined;
  userId: string | undefined;
  name: string | undefined;
  birthDate: string | undefined;
  phone: string | undefined;
  phonePrefix: string | undefined;
  extraInfo: string;
  skinPain: number;
  gender: number;
  skinType: number;
  skinSensibility: number;
  skinColor: number;
  allergy: number;
  allergyInfo: string;
  illness: number;
  illnessInfo: string;
  medication: number;
  medicationInfo: string;
  lactating: number;
  skinConcerns: SkinConcern[];
  objectives: Objective[];
  scenario: string | undefined;
  ageRange: number;
}
export interface SkinConcern {
  concern: string;
}

export interface Objective {
  objective: string;
}

export interface DermaQuestionsResponse {
  id: string | undefined;
  user: Client;
  name: string | undefined;
  birthDate: string | undefined;
  phone: string | undefined;
  phonePrefix: string | undefined;
  extraInfo: string;
  skinPain: number;
  gender: number;
  skinType: number;
  skinSensibility: number;
  skinColor: number;
  allergy: number;
  allergyInfo: string;
  illness: number;
  illnessInfo: string;
  medication: number;
  medicationInfo: string;
  lactating: number;
  skinConcerns: SkinConcern[];
  objectives: Objective[];
  scenario: string | undefined;
  photos: string[];
  ageRange: number;
}
