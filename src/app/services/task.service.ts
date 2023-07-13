import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board, Task } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private _http: HttpClient) {}

  addTask(id: any, data: Board): Observable<any> {
    return this._http.put(`http://localhost:3000/boards/${id}`, data);
  }

  getTaskList(id: any): Observable<any> {
    return this._http.get(`http://localhost:3000/boards/${id}`);
  }
}
