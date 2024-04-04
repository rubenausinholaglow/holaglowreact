import { Client } from '@interface/client';

export interface DermaQuestions {
  id: string | undefined;
  userId: string | undefined;
  name: string | undefined;
  birthDate: string | undefined;
  phone: string | undefined;
  phonePrefix: string | undefined;
  extraInfo: string;
  pain: painObject[] | [];
  skinType: number;
  skinSensibility: number;
  allergy: number;
  allergyInfo: string;
  illness: number;
  illnessInfo: string;
  medication: number;
  medicationInfo: string;
  lactating: number;
}
export interface SkinConcern {
  concern: string;
}

export interface painObject {
  skinPain: number;
  option: string;
}

export interface DermaQuestionsResponse {
  id: string | undefined;
  user: Client;
  name: string | undefined;
  birthDate: string | undefined;
  scenario: string | undefined;
  extraInfo: string | undefined;
  skinConcerns: SkinConcern[];
}
