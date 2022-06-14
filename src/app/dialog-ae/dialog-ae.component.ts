import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {AuthorService} from '../../_services/author.service';
import {EditorService} from '../../_services/editor.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dialog-ae',
  templateUrl: './dialog-ae.component.html',
  styleUrls: ['./dialog-ae.component.css']
})

export class DialogAeComponent implements OnInit {

  id: number;
  tipo: string;

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

}
