import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Task, Todo } from '../models';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  // Event to be fired (pushed to app.component)
  @Output()
  onTodo = new Subject<Todo>()

  // The data input into the form (pulled from app.component)
  @Input()
  todo:Todo | null = null

  // VARIABLES
  todoForm!:FormGroup
  taskArray!:FormArray

  // CONSTRUCTORS
  constructor(private fb:FormBuilder) {}

  // METHODS
  ngOnInit(): void {
      // Either trigger create form method (if form consist of form array)
      this.todoForm = this.createForm(this.todo)
  }

  // Triggered upon 'Save' Button 
  // Converts todoForm field values to Todo object
  processForm() {
    const todo:Todo = this.todoForm.value as Todo
    console.info('Processing form: ', todo)
    // .next passes the object to app.component method and be processed
    this.onTodo.next(todo)
  }

  // Triggered upon 'Clear' Button
  // Create new form with no input
  clearForm() {
    console.info('Resetting form')
    this.todoForm = this.createForm()
    this.taskArray.reset()
  }

  // Triggered upon 'Add TODO' Button
  // Add new todo - push new task field
  addTodo() {
    console.info('Adding new Todo')
    this.taskArray.push(this.createTask())
  }

  // If todoform.invalid or taskArray has no task object, return true => Disable 'Save' Button
  invalid():boolean {
    return this.todoForm.invalid || this.taskArray.length <= 0
  }

  // Remove task at particular index
  removeTask(i:number) {
    console.info('Removed task: ', i)
    this.taskArray.removeAt(i)
  }

  // Create form (Returns FormGroup)
  private createForm(todo:Todo | null = null) {
    // If tasks exist
    if (this.todo?.tasks) {
      this.taskArray = this.createTasks(this.todo.tasks)
    // If tasks don't exist
    } else {
      this.taskArray = this.createTasks([])
    }
    return this.fb.group({
      name:this.fb.control(todo?.name ? todo.name:'',[Validators.required]),
      tasks:this.taskArray
    })
  }

  // Create single task (Returns FormGroup)
  private createTask(task:Task | null = null):FormGroup {
    return this.fb.group({
      description:this.fb.control(task?.description ? task.description:'',[Validators.required]),
      priority:this.fb.control(task?.priority ? task.priority:'med',[Validators.required]),
      due:this.fb.control(task?.due ? task.due:'')
    })
  }

  // Create multiple tasks (Returns FormArray)
  private createTasks(tasks:Task[]) {
    // Map each task in array to form group
    return this.fb.array(tasks.map(t => this.createTask(t)))
  }
}
