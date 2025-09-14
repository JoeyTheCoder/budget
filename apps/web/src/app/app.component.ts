import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodosApi, Todo } from './todos.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Todos';
  loading = false;
  todos: Todo[] = [];
  newTitle = '';

  async ngOnInit() {
    this.loading = true;
    this.todos = await TodosApi.list();
    this.loading = false;
  }
  async add() {
    if (!this.newTitle.trim()) return;
    const todo = await TodosApi.create(this.newTitle.trim());
    this.todos.unshift(todo);
    this.newTitle = '';
  }
  async toggle(todo: Todo) {
    const updated = await TodosApi.toggle(todo.id, !todo.done);
    Object.assign(todo, updated);
  }
  async remove(todo: Todo) {
    await TodosApi.remove(todo.id);
    this.todos = this.todos.filter(t => t.id !== todo.id);
  }
}
