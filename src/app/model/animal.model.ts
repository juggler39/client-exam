import { IType } from "./type.model";

export interface IAnimal {
  healthIndex: string;
  endDate: string;
  minValueDateTime: string;
  type: string;
  cowId: string;
  animalId: string;
  eventId: number;
  deletable: boolean;
  lactationNumber: string;
  daysInLactation: string;
  ageInDays: string;
  startDateTime: string;
  reportingDateTime: string;
  alertType: string;
  duration: string;
  originalStartDateTime: string;
  endDateTime: string;
  daysInPregnancy: string;
  heatIndexPeak: string;
  newGroupId: string;
  newGroupName: string;
  currentGroupId: string;
  currentGroupName: string;
  destinationGroup: string;
  destinationGroupName: string;
  calvingEase: string;
  oldLactationNumber: string;
  newborns: string;
  cowEntryStatus: string;
  birthDateCalculated: string;
  sire: string;
  breedingNumber: string;
  isOutOfBreedingWindow: boolean;
  interval: string;
}
