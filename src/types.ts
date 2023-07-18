export interface Board {
  boardName: string;
  showMenu: boolean;
}
export interface Task {
  taskName: string;
  showMenu: boolean;
  boardId: number;
}
