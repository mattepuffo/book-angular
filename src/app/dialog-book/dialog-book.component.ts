import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Book} from "../../_interfaces/book";
import {BookService} from "../../_services/book.service";
import {Author} from "../../_interfaces/author";
import {AuthorService} from "../../_services/author.service";
import {Editor} from "../../_interfaces/editor";
import {EditorService} from "../../_services/editor.service";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dialog-book',
  templateUrl: './dialog-book.component.html',
  styleUrls: ['./dialog-book.component.css']
})

export class DialogBookComponent implements OnInit {

  id: number;
  titolo: string;
  autSel: string;
  edSel: string;

  book: Book;
  authors: Author[];
  editors: Editor[];

  frm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogBookComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private toastr: ToastrService,
    private bookSrv: BookService,
    private authorSrv: AuthorService,
    private editorSrv: EditorService
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

    this.editorSrv.getAll().subscribe((res) => {
      this.editors = [...res.editors];
    });

    if (this.id != 0) {
      this.bookSrv.getById(this.id).subscribe((res) => {
        this.book = {...res.books[0]};

        this.frm.patchValue(this.book);
        this.autSel = res.books[0].author_id.toString();
        this.edSel = res.books[0].editor_id.toString();
      });
    }

  }

  creaForm(): void {
    this.frm = new FormGroup({
      id: new FormControl(this.id),
      title: new FormControl('', Validators.required),
      author_id: new FormControl('', Validators.required),
      editor_id: new FormControl('', Validators.required),
      price: new FormControl('', [
        Validators.required,
        Validators.min(0)
      ]),
      isbn: new FormControl(''),
      scaffale: new FormControl('', Validators.required),
      note: new FormControl('')
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  send(): void {
    // console.log(this.frm.value);

    this.bookSrv.add(this.frm.value).subscribe((res) => {
      // console.log(res);

      if (res.res === 'ok') {
        this.toastr.success(res.message, "OK");

        this.close();
      } else {
        this.toastr.error(res.message, "ATTENZIONE");
      }
    });
  }

}
