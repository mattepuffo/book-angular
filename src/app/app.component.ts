import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BookService} from "../_services/book.service";
import {Book} from "../_interfaces/book";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  title = 'MP Book';

  books: Book[];
  dataSource = null;

  displayedColumns: string[] = ['title', 'author', 'editor'];

  constructor(
    private bookSrv: BookService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource = this.paginator;
  }

  public getData(): void {

    this.bookSrv.getAll()
      .subscribe((res) => {
        this.books = [...res.books];
        this.dataSource = new MatTableDataSource<Book>(this.books);
      });

  }

}

