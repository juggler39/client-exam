import { IType } from "./type.model";

export interface IAnimal {
  healthIndex: number;
  endDate: Date;
  minValueDateTime: Date;
  type: IType;
  cowId: number;
  animalId: string;
  eventId: number;
  deletable: boolean;
  lactationNumber: number;
  daysInLactation: number;
  ageInDays: number;
  startDateTime: number;
  reportingDateTime: number;
  alertType: string;
  duration: number;
  originalStartDateTime: Date;
  endDateTime: Date;
  daysInPregnancy: number;
  heatIndexPeak: number;
  newGroupId: string;
  newGroupName: string;
  currentGroupId: string;
  currentGroupName: string;
  destinationGroup: string;
  destinationGroupName: string;
  calvingEase: string;
  oldLactationNumber: number;
  newborns: null;
  cowEntryStatus: string;
  birthDateCalculated: Date;
  sire: null;
  breedingNumber: number;
  isOutOfBreedingWindow: boolean;
  interval: number;
}
