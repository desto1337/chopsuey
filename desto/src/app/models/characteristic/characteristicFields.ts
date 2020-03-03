export interface CharacteristicFields {
  text: string;
  type: CharacteristicType;
}

export enum CharacteristicType {
  vision = 'VISION',
  flexibility = 'FLEXIBILITY',
  completepackage = 'COMPLETEPACKAGE',
  interdisciplinary = 'INTERDISCIPLINARY'
}
