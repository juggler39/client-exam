import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditAnimalComponent } from '@components/edit-animal/edit-animal.component';
import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs';
import { IAnimal } from 'src/app/model/animal.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  animals$: Observable<IAnimal[]>;
  animals: IAnimal[];

  constructor(private apiService: ApiService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadAllAnimals();
    this.animals$.subscribe((data) => {
      this.animals = data;
    }
    );
  }

  loadAllAnimals() {
    this.animals$ = this.apiService.loadAnimals();
  }

  addEvent() {
    const dialogRef = this.dialog.open(EditAnimalComponent,
      {
        data: {
          title: 'Add new event'
        },
        width: '480px',
      });
    dialogRef.afterClosed().subscribe((animal: IAnimal) => {
      if (animal) {
        const maxId = Math.max(...this.animals.map(o => o.eventId));
        animal.eventId = maxId + 1;

        this.apiService.addEvent(animal).subscribe(
          (resp) => {
            if (resp.status == 200) {
              const event = resp.body;
              this.animals.unshift(event);
              this.animals = this.animals.filter((f) => f.eventId != 0);
            }
          },
        );
      }
    });
  }

  editAnimal(event: IAnimal) {
    const dialogRef = this.dialog.open(EditAnimalComponent,
      {
        data: {
          title: 'Edit this event',
          event: event
        },
        width: '480px',
      });

    dialogRef.afterClosed().subscribe((animal: IAnimal) => {

      this.apiService.updateEvent(animal).subscribe(
        (resp) => {
          if (resp.status == 200) {
            const event = resp.body;
            const index = this.animals.findIndex(e => e.eventId === event.eventId);
            this.animals[index] = event;
            this.animals = this.animals.filter((f) => f.eventId != 0);
          }
        },
      );

    });
  }

  removeAnimal(eventId: string) {
    this.apiService.deleteAnimal(eventId).subscribe(
      (resp) => {
        if (resp.status == 200) {
          const deletedEmpId = resp.body;
          this.animals = this.animals.filter((f) => f.eventId != deletedEmpId);
        }
      },
    );
  }

}
