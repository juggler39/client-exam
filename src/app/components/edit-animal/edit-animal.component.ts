import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnimalDialog } from 'src/app/model/animal-dialog.interface';

@Component({
  selector: 'app-edit-animal',
  templateUrl: './edit-animal.component.html',
  styleUrls: ['./edit-animal.component.scss']
})
export class EditAnimalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditAnimalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: AnimalDialog) {
  }

  ngOnInit(): void {
  }
  onSave() {

  }

}
