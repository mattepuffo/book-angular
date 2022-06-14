import {Component, Input, OnInit} from '@angular/core';
import {DialogBookComponent} from "../dialog-book/dialog-book.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogAeComponent} from '../dialog-ae/dialog-ae.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  @Input() title = 'MP Book';

  constructor(
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
  }

  openDialogBook(bookId): void {
    const dialogRef = this.dialog.open(DialogBookComponent, {
      width: '500px',
      data: {id: bookId},
    });

    // dialogRef.afterClosed().subscribe(result => {
    // this.getData();
    // });
  }

  openDialogAE(tipo): void {
    const dialogRef = this.dialog.open(DialogAeComponent, {
      width: '500px',
      data: {tipo: tipo},
    });
  }

}
