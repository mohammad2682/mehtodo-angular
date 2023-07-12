import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private _http: HttpClient) {}

  addTask(id: any, data: Task): Observable<any> {
    return this._http.post(`http://localhost:3000/boards/${id}/taskList`, data);
  }

  getTasks(): Observable<any> {
    return this._http.get('http://localhost:3000/boards');
  }
}
