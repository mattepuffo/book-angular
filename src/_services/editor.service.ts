import {Injectable} from '@angular/core';
import {config} from "../_helpers/config";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Editor} from "../_interfaces/editor";

@Injectable({
  providedIn: 'root'
})

export class EditorService {

  private baseUrl: string = config.api;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<{ editors: Editor[] }> {
    return this.http.get(`${this.baseUrl}/editor/get.php`).pipe(
      map((res: { editors: Editor[] }) => res)
    );
  }

  getById(id: number): Observable<{ editors: Editor }> {
    return this.http.get(`${this.baseUrl}/editor/get.php?id=${id}`).pipe(
      map((res: { editors: Editor }) => res)
    );
  }

}
