import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {config} from "../_helpers/config";
import {Book} from "../_interfaces/book";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class BookService {

  private baseUrl: string = config.api;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<{ books: Book[] }> {
    return this.http.get(`${this.baseUrl}/book/get.php`).pipe(
      map((res: { books: Book[] }) => res)
    );
  }

  getById(id: number): Observable<{ books: Book }> {
    return this.http.get(`${this.baseUrl}/book/get.php?id=${id}`).pipe(
      map((res: { books: Book }) => res)
    );
  }

}
