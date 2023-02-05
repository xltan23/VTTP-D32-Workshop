import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Task, Todo } from '../models';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent {

  // Event to be fired (pushed to app.component)
  @Output()
  onCompleted = new Subject<Task>()

  // Data pulled from app.component which in turn received the array processed from todo.component earlier
  @Input()
  tasks:Task[] = []

  // Triggered upon 'Completed' Button
  // .next pass the task object to app.component
  shiftToComplete(task:Task) {
    console.info('>>> Shifting task to completed:', task)
    this.onCompleted.next(task)
  }
}
