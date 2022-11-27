import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.scss']
})
export class DeleteEventComponent {

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
