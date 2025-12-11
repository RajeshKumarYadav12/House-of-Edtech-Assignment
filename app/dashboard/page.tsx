'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTasks } from '@/hooks/useTasks';
import Navbar from '@/components/Navbar';
import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Loader2, AlertCircle } from 'lucide-react';
import { ITask, TaskPriority } from '@/types';
import { toast } from 'sonner';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { tasks, loading, error, fetchTasks, deleteTask } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<ITask | null>(null);
  const [filter, setFilter] = useState<'all' | TaskPriority>('all');

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  const handleCreateTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEditTask = (task: ITask) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    await deleteTask(taskId);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleFormSuccess = () => {
    fetchTasks();
    handleFormClose();
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return task.priority === filter;
  });

  const priorityButtons: Array<{ value: 'all' | TaskPriority; label: string; count: number }> = [
    { value: 'all', label: 'All', count: tasks.length },
    { value: 'high', label: 'High Priority', count: tasks.filter(t => t.priority === 'high').length },
    { value: 'medium', label: 'Medium', count: tasks.filter(t => t.priority === 'medium').length },
    { value: 'low', label: 'Low', count: tasks.filter(t => t.priority === 'low').length },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">My Tasks</h1>
            <p className="text-muted-foreground mt-2">
              Manage your tasks with AI-powered suggestions
            </p>
          </div>
          <Button onClick={handleCreateTask} size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Add New Task
          </Button>
        </div>

        {/* Error State */}
        {error && (
          <Card className="mb-6 border-destructive">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {priorityButtons.map(({ value, label, count }) => (
            <Button
              key={value}
              onClick={() => setFilter(value)}
              variant={filter === value ? 'default' : 'outline'}
              className="relative"
            >
              {label}
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-background/20">
                {count}
              </span>
            </Button>
          ))}
        </div>

        {/* Tasks Grid */}
        {filteredTasks.length === 0 ? (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <div className="flex flex-col items-center gap-2">
                <AlertCircle className="h-12 w-12 text-muted-foreground" />
                <p className="text-xl font-semibold">No tasks found</p>
                <p className="text-muted-foreground mb-4">
                  {filter === 'all' 
                    ? 'Create your first task to get started'
                    : `No ${filter} priority tasks`
                  }
                </p>
                {filter === 'all' && (
                  <Button onClick={handleCreateTask}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Task
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </main>

      {/* Task Form Modal */}
      <TaskForm
        task={editingTask}
        open={showForm}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
      />
    </div>
  );
}
