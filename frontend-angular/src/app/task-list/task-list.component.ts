import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { Task } from 'src/model/task.model';

// interface Task {
//   id: number;
//   description: string;
//   completed: boolean;
// }

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private service: AppService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.service.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  markAsCompleted(task: Task) {
    task.completed = true;
  }

  addTask() {
    const newTaskDescription = prompt('Digite o nome da nova tarefa:');
    if (newTaskDescription) {
      const newTask: Task = { description: newTaskDescription, completed: false };
      this.service.addTask(newTask).subscribe(task => {
        this.tasks.push(task);
      });
    }
  }

}
