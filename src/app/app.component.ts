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

  books = new Array<Book>();

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
        console.log(res);

        this.books = res.map(item => {
          return new Book(
            item.id,
            item.title,
            item.author_id,
            item.author,
            item.editor_id,
            item.editor,
            item.price,
            item.isbn,
            item.note,
            item.scaffale
          )
        });
      });

  }

}

