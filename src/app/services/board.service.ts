import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private _http: HttpClient) {}

  addBoard(data: Board): Observable<any> {
    return this._http.post('http://localhost:3000/boards', data);
  }

  getBoards(): Observable<any> {
    return this._http.get('http://localhost:3000/boards');
  }
}
