import { Component, Input } from '@angular/core';
import { Board } from 'src/types';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  @Input() board: Board = {} as Board;
}
