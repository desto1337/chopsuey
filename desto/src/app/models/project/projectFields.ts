import { Sys, Asset } from 'contentful';

export interface ProjectFields {
  title: string;
  date: Date;
  description: string;
  skills: string[];
  image: {
    sys: Sys,
    fields: Asset
  }; // TO DO
  url: string;
}
