export interface Diagnosis {
  images: string[];
  professional: {
    name: string;
    imgSrc: string;
  };
  date: Date;
  user: {
    name: string;
    surname: string;
    secondSurname: string;
  };
  receipt: {
    expeditionDate: Date;
    link: string;
  };
}
