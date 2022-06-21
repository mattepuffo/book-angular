import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {AuthorService} from '../../_services/author.service';
import {EditorService} from '../../_services/editor.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Author} from "../../_interfaces/author";
import {Editor} from "../../_interfaces/editor";

@Component({
  selector: 'app-dialog-ae',
  templateUrl: './dialog-ae.component.html',
  styleUrls: ['./dialog-ae.component.css']
})

export class DialogAeComponent implements OnInit {

  id: number;
  tipo: string;
  titolo: string;

  author: Author;
  editor: Editor;

  frm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogAeComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private toastr: ToastrService,
    private authorSrv: AuthorService,
    private editorSrv: EditorService
  ) {
    this.id = data.id;
    this.tipo = data.tipo;
  }

  ngOnInit(): void {
    if (this.id == 0) {
      this.titolo = 'Aggiungi';
    } else {
      this.titolo = 'Modifica';
      this.getData();
    }

    if (this.tipo === 'autore') {
      this.titolo += ' autore';
    } else {
      this.titolo += ' editore';
    }

    this.creaForm();
  }

  getData(): void {
    if (this.tipo === 'autore') {
      this.authorSrv.getById(this.id).subscribe((res) => {
        this.author = {...res.authors[0]};
        this.frm.patchValue(this.author);
      });
    } else {
      this.editorSrv.getById(this.id).subscribe((res) => {
        this.editor = {...res.editors[0]};
        this.frm.patchValue(this.editor);
      });
    }
  }

  creaForm(): void {
    this.frm = new FormGroup({
      id: new FormControl(this.id),
      name: new FormControl('', Validators.required),
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  send(): void {
    // console.log(this.frm.value);

    if (this.tipo === 'autore') {
      this.authorSrv.add(this.frm.value).subscribe((res) => {
        if (res.res === 'ok') {
          this.toastr.success(res.message, "OK");

          this.close();
        } else {
          this.toastr.error(res.message, "ATTENZIONE");
        }
      });
    } else {
      this.editorSrv.add(this.frm.value).subscribe((res) => {
        if (res.res === 'ok') {
          this.toastr.success(res.message, "OK");

          this.close();
        } else {
          this.toastr.error(res.message, "ATTENZIONE");
        }
      });
    }

  }

}
