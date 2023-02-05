import { Component, OnInit } from '@angular/core';
import { Task, Todo } from './models';

const TODO:Todo = {
  name:'Ralph',
  tasks:[
    {description:'coding',priority:'high',due:'24 Feb'}
  ]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'D32W';
  
  // Data passed as input to todo.component
  data:Todo = TODO
  // Array passed as input to pending.component
  pendingTasks:Task[] = []
  // Array passed as input to completed.component
  completedTasks:Task[] = []

  processTodo(todo:Todo) {
    console.info('Process todo: ', todo)
    // For each task in Todo's array, push into pendingTasks array
    for (var t of todo.tasks) {
      this.pendingTasks.push(t)
    }
  }

  shiftToComplete(task:Task) {
    var i = this.pendingTasks.indexOf(task)
    // Remove task from pendingTasks array upon complete
    this.pendingTasks.splice(i,1)
    // Add task to completedTasks array upon complete
    this.completedTasks.push(task)
  }
}
