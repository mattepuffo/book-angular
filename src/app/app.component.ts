import {Component, OnInit} from '@angular/core';
import {BookService} from "../_services/book.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'MP Book';

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
        // this.movimenti = [...res.data];
        console.log(res.data);
      });
  }

}

