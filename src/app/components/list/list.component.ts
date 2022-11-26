import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditAnimalComponent } from '@components/edit-animal/edit-animal.component';
import { IAnimal } from 'src/app/model/animal.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addAnimal() {
    const dialogRef = this.dialog.open(EditAnimalComponent,
      {
        data: {
          title: 'Add a new animal',
        },
        width: '480px',
      });
    dialogRef.afterClosed().subscribe((animal: IAnimal) => {
      if (animal) {
        console.log('asdf');

      }
    });
  }

  onEdit(animal: IAnimal) {

    const dialogRef = this.dialog.open(EditAnimalComponent,
      {
        data: {
          title: 'Edit this animal',
          animal: animal.animalId
        },
        width: '480px',
      });

    dialogRef.afterClosed().subscribe((animal: IAnimal) => {
      console.log(animal);

    });
  }

}
