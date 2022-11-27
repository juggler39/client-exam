import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IAnimal } from "@model/animal.model";
import { ApiService } from "@services/api.service";
import { MatTable, MatTableDataSource } from '@angular/material/table';
import COLUMNS from '@model/fields.model';

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
  providers: [ApiService],
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  @Input() animals: IAnimal[];
  @Output() onEdit = new EventEmitter<IAnimal>();
  @Output() onRemove = new EventEmitter<string>();

  dataSource = new MatTableDataSource<IAnimal>();
  columns = [...COLUMNS];


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.animals);
    this.columns.push('actions');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['animals'].isFirstChange()) {
      this.dataSource.data = this.animals;
      this.table.renderRows();
      this.table.updateStickyColumnStyles();
    }
  }

  sortData(data: MatTableDataSource<IAnimal>) {
    data.sort = this.sort;
  }
}
