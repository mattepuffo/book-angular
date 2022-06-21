import {Injectable} from '@angular/core';
import {config} from "../_helpers/config";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Author} from "../_interfaces/author";

@Injectable({
  providedIn: 'root'
})

export class AuthorService {

  private baseUrl: string = config.api;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<{ authors: Author[] }> {
    return this.http.get(`${this.baseUrl}/author/get.php`).pipe(
      map((res: { authors: Author[] }) => res)
    );
  }

  getById(id: number): Observable<{ authors: Author }> {
    return this.http.get(`${this.baseUrl}/author/get.php?id=${id}`).pipe(
      map((res: { authors: Author }) => res)
    );
  }

  add(author: Author): Observable<{ res: string, message: string }> {
    return this.http.post(`${this.baseUrl}/author/add.php`, author).pipe(
      map((res: { res: string, message: string }) => res));
  }

}
