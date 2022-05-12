import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Book} from "../../_interfaces/book";
import {BookService} from "../../_services/book.service";

@Component({
  selector: 'app-dialog-book',
  templateUrl: './dialog-book.component.html',
  styleUrls: ['./dialog-book.component.css']
})

export class DialogBookComponent implements OnInit {

  id: number;
  titolo: string;

  book: Book;

  frm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogBookComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private bookSrv: BookService
  ) {
    this.id = data.id;
  }

  ngOnInit(): void {
    this.creaForm();

    if (this.id == 0) {
      this.titolo = 'Aggiungi libro';
    } else {
      this.titolo = 'Modifica libro';

      this.getData();
    }
  }

  getData(): void {
    this.bookSrv.getById(this.id).subscribe((res) => {
      this.book = {...res.books[0]};

      this.frm.patchValue(this.book);

      console.log(this.book);
    });
  }

  creaForm(): void {
    this.frm = new FormGroup({
      title: new FormControl('', Validators.required),
    });
  }

  close(): void {
    this.dialogRef.close();
  }

}
