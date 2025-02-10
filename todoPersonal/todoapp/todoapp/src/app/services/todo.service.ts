// todo.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: string;
  completedDate?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService 
{
  private readonly API_URL = 'http://localhost:5016/api/Task';
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.loadTodos();
  }

  private loadTodos() {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.http.get<Todo[]>(`${this.API_URL}/${userId}`)
        .subscribe(todos => this.todosSubject.next(todos));
    }
  }

  addTodo(title: string, dueDate: string) {
    const userId = this.authService.getCurrentUserId();
    const todo = {
      title,
      dueDate: new Date(dueDate),
      completed: false,
      userId
    };

    this.http.post<Todo>(this.API_URL, todo)
      .subscribe(() => this.loadTodos());
  }


  toggleTodo(id: number) {
    const updatedTodo = this.todosSubject.value.find(todo => todo.id === id);
    if (updatedTodo) {
      updatedTodo.completed = !updatedTodo.completed;
      updatedTodo.completedDate = updatedTodo.completed ? new Date().toISOString() : undefined;
  
      this.http.put(`${this.API_URL}/${id}`, updatedTodo)
        .subscribe(() => this.loadTodos());
    }
  }

  deleteTodo(id: number) {
    const userId = this.authService.getCurrentUserId();
    this.http.delete(`${this.API_URL}/${userId}/${id}`)
      .subscribe(() => this.loadTodos());
  }

  editTodo(id: number, newTitle: string, newDueDate: string) {
    const todo = this.todosSubject.value.find(t => t.id === id);
    if (todo) {
      const updatedTodo = {
        ...todo,
        title: newTitle,
        dueDate: new Date(newDueDate)
      };

      this.http.put(`${this.API_URL}/${id}`, updatedTodo)
        .subscribe(() => this.loadTodos());
    }
  }

  clearAll() {
    const userId = this.authService.getCurrentUserId();
    this.http.delete(`${this.API_URL}/${userId}`)
      .subscribe(() => this.loadTodos());
  }

  
}
