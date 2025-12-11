export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface ITask {
  _id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  deadline: Date;
  status: 'todo' | 'in-progress' | 'completed';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export interface CreateTaskInput {
  title: string;
  description: string;
  priority: TaskPriority;
  deadline: Date | string;
  status?: TaskStatus;
}

export interface UpdateTaskInput extends Partial<CreateTaskInput> {
  status?: TaskStatus;
}

export interface AISuggestions {
  title: string;
  priority: TaskPriority;
  deadline: string;
}
