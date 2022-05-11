import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BookService} from "../_services/book.service";
import {Book} from "../_interfaces/book";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  title = 'MP Book';

  books: Book[];
  dataSource = new MatTableDataSource<Book>();

  displayedColumns: string[] = ['title', 'author', 'editor', 'isbn', 'price', 'note'];

  constructor(
    private bookSrv: BookService,
    private liveAnnouncer: LiveAnnouncer
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  getData(): void {

    this.bookSrv.getAll()
      .subscribe((res) => {
        this.books = [...res.books];
        this.dataSource.data = this.books;
      });

  }

}

