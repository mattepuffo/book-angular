import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BookService} from '../../_services/book.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookSrv: BookService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  del(): void {
    const data = {
      id: this.data.id
    };

    this.bookSrv.del(data).subscribe((res) => {
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
