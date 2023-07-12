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
  @Input() boardId: Board = {} as Board;
  newTaskName: string;
  addingTask: boolean = false;

  // ngOnInit(): void {
  //   this.getTask();
  // }

  // getBoards() {
  //   this._boardService.getBoards().subscribe({
  //     next: (res) => {
  //       this.boards = res;
  //     },
  //     error: console.log,
  //   });
  // }

  constructor(
    private _taskService: TaskService,
    private _coreService: CoreService
  ) {}

  addTask() {
    // console.log(this.boardId);
    if (!this.newTaskName) {
      this.addingTask = false;
      return;
    }
    const newTask: Task = {
      taskName: this.newTaskName,
      showMenu: false,
    };
    this._taskService.addTask(this.boardId, newTask).subscribe({
      next: (val: any) => {
        this._coreService.openSnackBar('Board added successfully', 'Yay');
        this.addingTask = !this.addingTask;
        // this.getTask();
        this.newTaskName = '';
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
