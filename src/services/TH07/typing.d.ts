declare namespace TH07 {
  export interface TaskItem {
    id: string;
    title: string;
    assignee: string;
    priority: 'Low' | 'Medium' | 'High';
    deadline: string;
    status: 'Todo' | 'Doing' | 'Done';
  }
}