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
import { IEvent } from "@model/event.model";
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
  @Input() events: IEvent[];
  @Output() onEdit = new EventEmitter<IEvent>();
  @Output() onRemove = new EventEmitter<string>();

  dataSource = new MatTableDataSource<IEvent>();
  columns = [...COLUMNS];


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.events);
    this.columns.push('actions');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['events'].isFirstChange()) {
      this.dataSource.data = this.events;
      this.table.renderRows();
      this.table.updateStickyColumnStyles();
    }
  }

  sortData(data: MatTableDataSource<IEvent>) {
    data.sort = this.sort;
    this.updateStickyColumns()
  }

  paginatorClick() {
    this.updateStickyColumns()
  }

  updateStickyColumns() {
    setTimeout(() => this.table.updateStickyColumnStyles(), 0)
  }
}
