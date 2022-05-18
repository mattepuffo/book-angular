import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Book} from "../../_interfaces/book";
import {BookService} from "../../_services/book.service";
import {Author} from "../../_interfaces/author";
import {AuthorService} from "../../_services/author.service";

@Component({
  selector: 'app-dialog-book',
  templateUrl: './dialog-book.component.html',
  styleUrls: ['./dialog-book.component.css']
})

export class DialogBookComponent implements OnInit {

  id: number;
  titolo: string;

  book: Book;
  authors: Author[];

  frm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogBookComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private bookSrv: BookService,
    private authorSrv: AuthorService
  ) {
    this.id = data.id;
  }

  ngOnInit(): void {
    this.creaForm();

    if (this.id == 0) {
      this.titolo = 'Aggiungi libro';
    } else {
      this.titolo = 'Modifica libro';
    }

    this.getData();
  }

  getData(): void {
    this.authorSrv.getAll().subscribe((res) => {
      this.authors = [...res.authors];
    });

    if (this.id != 0) {
      this.bookSrv.getById(this.id).subscribe((res) => {
        this.book = {...res.books[0]};

        this.frm.patchValue(this.book);
      });
    }

  }

  creaForm(): void {
    this.frm = new FormGroup({
      title: new FormControl('', Validators.required),
      author_id: new FormControl('', Validators.required),
      price: new FormControl('', [
        Validators.required,
        Validators.min(0)
      ]),
      isbn: new FormControl('', Validators.required),
      scaffale: new FormControl('', Validators.required),
      note: new FormControl('')
    });
  }

  close(): void {
    this.dialogRef.close();
  }

}
