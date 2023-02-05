// Create model Todo
export interface Todo {
    name:string 
    tasks:Task[]
}

// Create model Task
export interface Task {
    description:string
    priority:string
    due:string
}

