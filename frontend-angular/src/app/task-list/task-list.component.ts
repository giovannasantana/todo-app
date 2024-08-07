import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { Task } from 'src/model/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private service: AppService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.service.getTasks().subscribe((tasks) => {
      this.tasks = tasks.todos;
    });
  }

  markAsCompleted(task: Task) {
    task.isComplete = true;
  }

  addTask() {
    const newTaskDescription = prompt('Digite o nome da nova tarefa:');
    if (newTaskDescription) {
      const newTask: Task = { description: newTaskDescription, isComplete: false };
      this.service.addTask(newTask).subscribe(task => {
        this.tasks.push(task);
        this.loadTasks();
      });
    }
  }
}
