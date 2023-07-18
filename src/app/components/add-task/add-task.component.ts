import { Component, Input } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';
import { TaskService } from 'src/app/services/task.service';
import { Board, Task } from 'src/types';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  @Input() board: Board = {} as Board;
  @Input() boardId: number;
  newTaskName: string;
  addingTask: boolean = false;
  taskList: any;

  constructor(
    private _taskService: TaskService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList() {
    this._taskService.getTaskList(this.boardId).subscribe({
      next: (res) => {
        this.taskList = res;
      },
      error: console.log,
    });
  }

  addTask() {
    if (!this.newTaskName) {
      this.addingTask = false;
      return;
    }
    const newTask: Task = {
      taskName: this.newTaskName,
      showMenu: false,
      boardId: this.boardId,
    };
    this._taskService.addTask(newTask).subscribe({
      next: (val: any) => {
        this._coreService.openSnackBar('New task added successfully', 'Yay');
        this.addingTask = !this.addingTask;
        this.getTaskList();
        this.newTaskName = '';
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
