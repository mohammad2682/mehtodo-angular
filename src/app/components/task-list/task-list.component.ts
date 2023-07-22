import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/types';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  @Input() taskList: any = {} as Task;
  @Input() boardId: number;
  @Output() deleteSingleTask = new EventEmitter<number>();
  showingTaskList: any;

  constructor(public dialog: MatDialog) {}

  deleteTask(id: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this task?',
      },
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // result will be true if the user clicked on "Confirm" in the dialog
      if (result) {
        this.deleteSingleTask.emit(id);
      }
    });
  }
}
