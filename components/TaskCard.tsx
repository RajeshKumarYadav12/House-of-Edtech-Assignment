'use client';

import { ITask } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Edit, Trash2, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface TaskCardProps {
  task: ITask;
  onEdit: (task: ITask) => void;
  onDelete: (taskId: string) => void;
}

const priorityStyles = {
  low: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900',
  high: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900',
};

const statusStyles = {
  'todo': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  'completed': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
};

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const formatDate = (date: Date) => {
    try {
      return format(new Date(date), 'MMM dd, yyyy');
    } catch {
      return 'Invalid date';
    }
  };

  const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'completed';

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              priorityStyles[task.priority]
            }`}
          >
            {task.priority.toUpperCase()}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              statusStyles[task.status]
            }`}
          >
            {task.status.replace('-', ' ').toUpperCase()}
          </span>
        </div>
        <h3 className="text-xl font-bold line-clamp-2">{task.title}</h3>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground line-clamp-3 mb-4">{task.description}</p>
        
        <div className="flex items-center text-sm">
          <Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
          <span className={isOverdue ? 'text-destructive font-semibold' : 'text-muted-foreground'}>
            {formatDate(task.deadline)}
            {isOverdue && ' (Overdue)'}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="gap-2">
        <Button
          onClick={() => onEdit(task)}
          variant="default"
          className="flex-1"
          size="sm"
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button
          onClick={() => onDelete(task._id)}
          variant="destructive"
          className="flex-1"
          size="sm"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
