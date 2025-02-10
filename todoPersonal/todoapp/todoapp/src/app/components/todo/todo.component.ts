import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService, Todo } from '../../services/todo.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  todos: Todo[] = [];
  newTodo = '';
  dueDate = '';
  editingId: number | null = null;
  editingText = '';
  editingDate = '';
  today = new Date().toISOString().split('T')[0];

  // Tab System
  tabs: ('all' | 'completed' | 'overdue' | 'pending')[] = ['all', 'completed', 'overdue', 'pending'];
  activeTab: 'all' | 'completed' | 'overdue' | 'pending' = 'all';

  // Date Filter
  fromDate = '';
  toDate = '';
  appliedFromDate = '';
  appliedToDate = '';

  // Search System
  searchTerm = '';
  appliedSearchTerm = '';

  constructor(
    private todoService: TodoService,
    private authService: AuthService,
    private router: Router
  ) {
    this.todoService.todos$.subscribe((todos) => (this.todos = todos));
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  get filteredTodos() {
    let filtered = this.todos;
    
    // Tab Filter
    switch(this.activeTab) {
      case 'completed': 
        filtered = filtered.filter(t => t.completed);
        break;
      case 'overdue':
        filtered = filtered.filter(t => this.isOverdue(t));
        break;
      case 'pending':
        filtered = filtered.filter(t => !t.completed && !this.isOverdue(t));
        break;
    }

    // Date Filter
    if (this.appliedFromDate || this.appliedToDate) {
      filtered = filtered.filter(t => this.isWithinDateRange(t));
    }

    // Search Filter
    if (this.appliedSearchTerm) {
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(this.appliedSearchTerm)
      );
    }

    return filtered;
  }

  // Filter Methods
  setActiveTab(tab: 'all' | 'completed' | 'overdue' | 'pending') {
    this.activeTab = tab;
  }

  applyDateFilter() {
    this.appliedFromDate = this.fromDate;
    this.appliedToDate = this.toDate;
  }

  applySearch() {
    this.appliedSearchTerm = this.searchTerm.trim().toLowerCase();
  }

  isWithinDateRange(todo: Todo): boolean {
    if (!todo.dueDate) return false;
    const due = new Date(todo.dueDate);
    const from = this.appliedFromDate ? new Date(this.appliedFromDate) : null;
    const to = this.appliedToDate ? new Date(this.appliedToDate) : null;

    if (from && to) return due >= from && due <= to;
    if (from) return due >= from;
    if (to) return due <= to;
    return true;
  }

  // Core Functionality
  getCount(tab: string): number {
    switch(tab) {
      case 'all': return this.todos.length;
      case 'completed': return this.completedCount;
      case 'overdue': return this.overdueCount;
      case 'pending': 
        return this.todos.length - this.completedCount - this.overdueCount;
      default: return 0;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get completedCount() {
    return this.todos.filter(t => t.completed).length;
  }

  get overdueCount() {
    return this.todos.filter(t => this.isOverdue(t)).length;
  }

  // isOverdue(todo: Todo) {
  //   if (todo.completed || !todo.dueDate) return false;
  //   const due = new Date(todo.dueDate);
  //   return due < new Date();
  // }

  isOverdue(todo: Todo) {
    if (todo.completed || !todo.dueDate) return false;
    
    // Compare dates without time components
    const dueDate = new Date(todo.dueDate.split('T')[0]);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight
    
    return dueDate < today;
  }

  addTodo() {
  if (this.newTodo.trim()) {
    // Use selected date or today's date if none selected
    const dueDate = this.dueDate ? this.dueDate : this.today;
    
    this.todoService.addTodo(
      this.newTodo.trim(), 
      dueDate
    );
    
    // Reset inputs
    this.newTodo = '';
    this.dueDate = '';
  }
}


  clearAll() {
      this.todoService.clearAll();    
  }

  toggleTodo(id: number) {
    this.todoService.toggleTodo(id);
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }

  editTodo(id: number, title: string, dueDate: string) {
    this.editingId = id;
    this.editingText = title;
    this.editingDate = dueDate || this.today;
  }

  saveEdit(id: number) {
    if (this.editingText.trim()) {
      this.todoService.editTodo(id, this.editingText.trim(), this.editingDate);
    }
    this.editingId = null;
    this.editingText = '';
    this.editingDate = '';
  }

  cancelEdit() {
    this.editingId = null;
    this.editingText = '';
    this.editingDate = '';
  }

  // Add this method to reset filters
  resetFilters() {
    this.activeTab = 'all';
    this.fromDate = '';
    this.toDate = '';
    this.appliedFromDate = '';
    this.appliedToDate = '';
  }

}