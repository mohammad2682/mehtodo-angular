export interface Board {
  boardName: string;
  showMenu: boolean;
  taskList: Task[];
}
export interface Task {
  taskName: string;
  showMenu: boolean;
}
