import { User } from './appointment';

export interface UpsellingData {
  user: User;
  creationDate: Date;
  routine: number;
  receiptUrl: string;
  photos: string[];
  diagnostic: string;
}
