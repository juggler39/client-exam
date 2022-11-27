import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnimalDialog } from '@model/animal-dialog.model';
import FIELDS from '@model/fields.model'

@Component({
  selector: 'app-edit-animal',
  templateUrl: './edit-animal.component.html',
  styleUrls: ['./edit-animal.component.scss']
})
export class EditAnimalComponent implements OnInit {

  eventForm: FormGroup;
  fields: string[] = [...FIELDS];
  controls = new FormArray([]);

  constructor(public dialogRef: MatDialogRef<EditAnimalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: AnimalDialog) {
  }

  ngOnInit(): void {

    this.initForm();
  }

  onSave() {
    const event: any = {};
    Object.keys(this.eventForm.controls).forEach((x) => {
      event[x] = this.eventForm.controls[x].value;
    });
    this.dialogRef.close(event);
  }

  initForm() {
    this.eventForm = new FormGroup({
      'eventId': new FormControl({ value: this.data.event?.eventId ?? null, disabled: true }),
      'type': new FormControl(this.data.event?.type ?? null),
      'cowId': new FormControl(this.data.event?.cowId ?? null),
      'animalId': new FormControl(this.data.event?.animalId ?? null),
      'deletable': new FormControl(this.data.event?.deletable ?? null),
      'lactationNumber': new FormControl(this.data.event?.lactationNumber ?? null),
      'daysInLactation': new FormControl(this.data.event?.daysInLactation ?? null),
      'ageInDays': new FormControl(this.data.event?.ageInDays ?? null),
      'startDateTime': new FormControl(this.data.event?.startDateTime ?? null),
      'reportingDateTime': new FormControl(this.data.event?.reportingDateTime ?? null),
      'healthIndex': new FormControl(this.data.event?.healthIndex ?? null),
      'endDate': new FormControl(this.data.event?.endDate ?? null),
      'minValueDateTime': new FormControl(this.data.event?.minValueDateTime ?? null),
      'alertType': new FormControl(this.data.event?.alertType ?? null),
      'duration': new FormControl(this.data.event?.duration ?? null),
      'originalStartDateTime': new FormControl(this.data.event?.originalStartDateTime ?? null),
      'endDateTime': new FormControl(this.data.event?.endDateTime ?? null),
      'daysInPregnancy': new FormControl(this.data.event?.daysInPregnancy ?? null),
      'heatIndexPeak': new FormControl(this.data.event?.heatIndexPeak ?? null),
      'newGroupId': new FormControl(this.data.event?.newGroupId ?? null),
      'newGroupName': new FormControl(this.data.event?.newGroupName ?? null),
      'currentGroupId': new FormControl(this.data.event?.currentGroupId ?? null),
      'currentGroupName': new FormControl(this.data.event?.currentGroupName ?? null),
      'destinationGroup': new FormControl(this.data.event?.destinationGroup ?? null),
      'destinationGroupName': new FormControl(this.data.event?.destinationGroupName ?? null),
      'calvingEase': new FormControl(this.data.event?.calvingEase ?? null),
      'oldLactationNumber': new FormControl(this.data.event?.oldLactationNumber ?? null),
      'newborns': new FormControl(this.data.event?.newborns ?? null),
      'cowEntryStatus': new FormControl(this.data.event?.cowEntryStatus ?? null),
      'birthDateCalculated': new FormControl(this.data.event?.birthDateCalculated ?? null),
      'sire': new FormControl(this.data.event?.sire ?? null),
      'breedingNumber': new FormControl(this.data.event?.breedingNumber ?? null),
      'isOutOfBreedingWindow': new FormControl(this.data.event?.isOutOfBreedingWindow ?? null),
      'interval': new FormControl(this.data.event?.interval ?? null),
    });
  }
}
