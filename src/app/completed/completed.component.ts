import { Component, Input } from '@angular/core';
import { Task } from '../models';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent {

  // Data pulled from app.component which in turn received the array processed from pending.component earlier
  @Input()
  completedTasks:Task[] = []
}
