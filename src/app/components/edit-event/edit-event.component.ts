import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventDialog } from '@model/event-dialog.model';
import FIELDS from '@model/fields.model'

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

  eventForm: FormGroup;
  fields: string[] = [...FIELDS];
  controls = new FormArray([]);

  constructor(public dialogRef: MatDialogRef<EditEventComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: EventDialog) {
  }

  ngOnInit(): void {
    this.eventForm = new FormGroup({});

    this.fields.forEach((field) => {
      this.eventForm.addControl(field, new FormControl(''))
    })

    if (this.data.event) {
      Object.entries(this.data.event).forEach(([key, value]) => {
        this.eventForm.get(key)?.setValue(value);
      })
    }
    this.eventForm.controls['eventId'].disable();
  }

  onSave(): void {
    const event: any = {};
    Object.keys(this.eventForm.controls).forEach((control) => {
      event[control] = this.eventForm.controls[control].value;
    });
    this.dialogRef.close(event);
  }
}
