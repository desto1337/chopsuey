import { Asset } from 'contentful';

export interface ProjectFields {
  title: string;
  date: Date;
  description: string;
  skills: string[];
  image: Asset;
  imageCopyright: string;
  url: string;
}
