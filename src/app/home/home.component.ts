import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Book} from '../../_interfaces/book';
import {MatTableDataSource} from '@angular/material/table';
import {BookService} from '../../_services/book.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatDialog} from '@angular/material/dialog';
import {DialogBookComponent} from '../dialog-book/dialog-book.component';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {AuthorService} from "../../_services/author.service";
import {Author} from "../../_interfaces/author";
import {Editor} from "../../_interfaces/editor";
import {EditorService} from "../../_services/editor.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('sortBooks') public sortBooks: MatSort;
  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild('pagBooks') paginator: MatPaginator;

  @ViewChild('sortAuthors') public sortAuthors: MatSort;
  // @ViewChild(MatSort) sortAuthors: MatSort;
  @ViewChild('pagAuthors') paginatorAuthors: MatPaginator;

  @ViewChild('sortEditors') public sortEditors: MatSort;
  // @ViewChild(MatSort) sortEditors: MatSort;
  @ViewChild('pagEditors') paginatorEditors: MatPaginator;

  books: Book[];
  dataSource = new MatTableDataSource<Book>();
  displayedColumns: string[] = ['title', 'author', 'editor', 'isbn', 'price', 'note', 'id'];

  authors: Author[];
  dataSourceAuthors = new MatTableDataSource<Author>();

  editors: Editor[];
  dataSourceEditors = new MatTableDataSource<Editor>();

  displayedColumnsAE: string[] = ['name', 'id'];

  constructor(
    private liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    private bookSrv: BookService,
    private authorSrv: AuthorService,
    private editorSrv: EditorService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sortBooks;

    this.dataSourceAuthors.paginator = this.paginatorAuthors;
    this.dataSourceAuthors.sort = this.sortAuthors;

    this.dataSourceEditors.paginator = this.paginatorEditors;
    this.dataSourceEditors.sort = this.sortEditors;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  getData(): void {
    this.bookSrv.getAll().subscribe((res) => {
      this.books = [...res.books];
      this.dataSource.data = this.books;
    });

    this.authorSrv.getAll().subscribe((res) => {
      this.authors = [...res.authors];
      this.dataSourceAuthors.data = this.authors;
    });

    this.editorSrv.getAll().subscribe((res) => {
      this.editors = [...res.editors];
      this.dataSourceEditors.data = this.editors;
    });
  }

  doFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  doFilterAuthors(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAuthors.filter = filterValue.trim().toLowerCase();
  }

  doFilterEditors(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEditors.filter = filterValue.trim().toLowerCase();
  }

  openDialogBook(bookId): void {
    const dialogRef = this.dialog.open(DialogBookComponent, {
      width: '500px',
      data: {id: bookId},
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.getData();
    });
  }

  del(bookId) {
    const confirmDlg = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'ATTENZIONE!',
        message: 'Vuoi cancellare questo libro?',
        id: bookId
      },
    });

    confirmDlg.afterClosed().subscribe(result => {
      this.getData();
    });
  }
}
