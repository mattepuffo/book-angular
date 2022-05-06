import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {config} from "../_helpers/config";
import {Book} from "../_interfaces/book";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class BookService {

  private baseUrl: string = config.api;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Book[]> {
    const url = `${this.baseUrl}/book/get.php`;
    return this.http.get<Book[]>(url);
  }

}
