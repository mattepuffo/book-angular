import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Author} from "../../_interfaces/author";
import {MatTableDataSource} from "@angular/material/table";
import {Editor} from "../../_interfaces/editor";
import {DialogBookComponent} from "../dialog-book/dialog-book.component";
import {MatDialog} from "@angular/material/dialog";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {EditorService} from "../../_services/editor.service";

@Component({
  selector: 'app-editori',
  templateUrl: './editori.component.html',
  styleUrls: ['./editori.component.css']
})
export class EditoriComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  editors: Editor[];
  dataSource = new MatTableDataSource<Editor>();
  displayedColumns: string[] = ['name', 'id'];

  constructor(
    public dialog: MatDialog,
    private liveAnnouncer: LiveAnnouncer,
    private editorSrv: EditorService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getData(): void {
    this.editorSrv.getAll().subscribe((res) => {
      this.editors = [...res.editors];
      this.dataSource.data = this.editors;
    });
  }

  openDialogBook(bookId): void {
    const dialogRef = this.dialog.open(DialogBookComponent, {
      width: '500px',
      data: {id: bookId},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }

  doFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

}
