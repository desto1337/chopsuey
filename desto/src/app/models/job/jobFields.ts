import { Asset } from 'contentful';

export interface JobFields {
  title: string;
  company: string;
  city: string;
  description: string;
  fromDate: Date;
  tillDate: Date;
  url: string;
  icon: Asset // TO DO
  sideJob: boolean;
}
