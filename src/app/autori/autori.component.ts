import {Component, OnInit} from '@angular/core';
import {Author} from "../../_interfaces/author";
import {MatTableDataSource} from "@angular/material/table";
import {AuthorService} from "../../_services/author.service";
import {DialogBookComponent} from "../dialog-book/dialog-book.component";
import {MatDialog} from "@angular/material/dialog";
import {Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
  selector: 'app-autori',
  templateUrl: './autori.component.html',
  styleUrls: ['./autori.component.css']
})

export class AutoriComponent implements OnInit {

  title = 'Autori';

  authors: Author[];
  dataSource = new MatTableDataSource<Author>();
  displayedColumns: string[] = ['name', 'id'];

  constructor(
    private authorSrv: AuthorService,
    public dialog: MatDialog,
    private liveAnnouncer: LiveAnnouncer,
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.authorSrv.getAll().subscribe((res) => {
      this.authors = [...res.authors];
      this.dataSource.data = this.authors;
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
