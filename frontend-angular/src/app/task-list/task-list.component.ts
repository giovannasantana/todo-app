import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

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

}
