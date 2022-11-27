import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-delete-animal',
  templateUrl: './delete-animal.component.html',
  styleUrls: ['./delete-animal.component.scss']
})
export class DeleteAnimalComponent {

  @Output() result = new EventEmitter<boolean>();

  constructor(public dialog: MatDialog) { }

  onRemove() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '320px' });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.result.emit(true);
      }
    });
  }

}
