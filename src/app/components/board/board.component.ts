import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { CoreService } from 'src/app/core/core.service';
import { Board } from 'src/types';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  isShowing: boolean = false;
  boards: any;

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

  addBoard(event: any) {
    const value = event.target.value;
    const newBoard: Board = {
      boardName: value,
    };
    console.log(newBoard);
    this._boardService.addBoard(newBoard).subscribe({
      next: (val: any) => {
        this._coreService.openSnackBar('Board added successfully', 'Yay');
        this.isShowing = !this.isShowing;
        this.getBoards();
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
