import { Component, Input } from '@angular/core';
import { Task } from 'src/types';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  @Input() taskList: any = {} as Task;
  @Input() boardId: number;
  showingTaskList: any;
}
