import { SkillType } from './skillTypes';

export interface SkillFields {
  title: string;
  level: number;
  type: SkillType;
  isLanguage: boolean;
}
