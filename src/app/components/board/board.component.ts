import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { CoreService } from 'src/app/core/core.service';
import { Board } from 'src/types';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  isShowing: boolean = false;
  addingTask: boolean = false;
  isEditing: boolean = false;
  boards: any;
  newBoardName: any;

  constructor(
    private _boardService: BoardService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getBoards();
  }

  getBoards() {
    this._boardService.getBoards().subscribe({
      next: (res) => {
        this.boards = res;
      },
      error: console.log,
    });
  }

  editBoard(id: number, data: any) {
    this._boardService.updateBoard(id, data).subscribe({
      next: (res) => {
        this.isEditing = true;
        this._coreService.openSnackBar('Board updated successfully!', 'Ok');
        this.isEditing = false;
        this.getBoards();
      },
    });
  }

  deleteBoard(id: number) {
    this._boardService.deleteBoard(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Board deleted successfully!', 'Ok');
        this.getBoards();
      },
    });
  }

  addBoard() {
    // const value = event.target.value;
    if (!this.newBoardName) {
      this.isShowing = false;
      return;
    }
    const newBoard: Board = {
      boardName: this.newBoardName,
      showMenu: false,
      taskList: [],
    };
    this._boardService.addBoard(newBoard).subscribe({
      next: (val: any) => {
        this._coreService.openSnackBar('Board added successfully', 'Yay');
        this.isShowing = !this.isShowing;
        this.getBoards();
        this.newBoardName = '';
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
