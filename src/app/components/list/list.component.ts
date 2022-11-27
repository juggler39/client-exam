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

    constructor(private apiService: ApiService, public dialog: MatDialog) { }

    ngOnInit(): void {
        this.loadAllAnimals();
    }

    loadAllAnimals() {
        this.animals$ = this.apiService.loadAnimals();
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
                console.log(animal);
            }
        });
    }

    editAnimal(animal: IAnimal) {
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

    removeAnimal(animalId: string) {

        console.log(animalId);


    }

}
