import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { IAnimal } from "src/app/model/animal.model";
import { ApiService } from "src/app/services/api.service";
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable } from "rxjs";


@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
  providers: [ApiService],
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() animals$: Observable<IAnimal[]>;
  @Output() onEdit = new EventEmitter<IAnimal>();
  @Output() onRemove = new EventEmitter<string>();

  showLoading = false;
  dataSource = new MatTableDataSource<IAnimal>();
  dataSource$: Observable<any>;
  columns$: Observable<string[]>;

  ID = 'animalId';

  ngOnInit(): void {
    this.dataSource$ = this.animals$
      .pipe(
        map(animals => {
          const dataSource = this.dataSource;
          dataSource.data = animals;
          return dataSource;
        }));

    this.columns$ = this.animals$.pipe(
      map((animals) => {
        const columnSet: Set<string> = new Set();
        animals.forEach((animal) => {
          Object.keys(animal).forEach(key => columnSet.add(key));
        })
        columnSet.delete(this.ID);
        const columns = Array.from(columnSet);
        columns.unshift(this.ID);
        columns.push('actions');
        return columns;
      }),
    )
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  sortData(data: MatTableDataSource<IAnimal>) {
    data.sort = this.sort;
  }

}
