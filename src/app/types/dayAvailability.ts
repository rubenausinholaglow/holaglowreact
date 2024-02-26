export interface DayAvailability {
  date: string;
  availability: boolean;
}

export interface MonthAvailabilityResponse {
  dayAvailabilities : Array<DayAvailability>
  totalTime : number;
}