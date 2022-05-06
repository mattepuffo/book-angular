import {Component, OnInit} from '@angular/core';
import {BookService} from "../_services/book.service";
import {Book} from "../_interfaces/book";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'MP Book';

  books: Book[];

  displayedColumns: string[] = ['title'];

  constructor(
    private bookSrv: BookService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  public getData(): void {
    this.bookSrv.getAll()
      .subscribe((res) => {
        this.books = [...res.books];
      });

  }

}

