import { Client } from '@interface/client';

export interface DermaQuestions {
  id: string | undefined;
  userId: string | undefined;
  name: string | undefined;
  birthDate: string | undefined;
  scenario: string | undefined;
  phone: string | undefined;
  phonePrefix: string | undefined;
  extraInfo: string | undefined;
  skinConcerns: SkinConcern[];
}
export interface SkinConcern {
  concern: string;
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
export interface SkinConcern {
  concern: string;
}
