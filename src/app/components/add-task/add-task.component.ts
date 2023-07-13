import { Component, Input } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';
import { BoardService } from 'src/app/services/board.service';
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
  boards: any;

  constructor(
    private _taskService: TaskService,
    private _boardService: BoardService,
    private _coreService: CoreService
  ) {}

  // ngOnInit() {
  //   this._taskService.getTaskList(this.boardId).subscribe({
  //     next: (val: any) => {
  //       this.board.taskList = val;
  //     },
  //     error: (err: any) => {
  //       console.error(err);
  //     },
  //   });
  // }

  getTaskList() {
    this._taskService.getTaskList(this.boardId).subscribe({
      next: (res) => {
        this.board.taskList = res.taskList;
      },
      error: console.log,
    });
  }

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
    const updatedBoard: Board = {
      boardName: this.board.boardName,
      showMenu: false,
      taskList: [newTask, ...this.board.taskList],
    };
    this._taskService.addTask(this.boardId, updatedBoard).subscribe({
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
