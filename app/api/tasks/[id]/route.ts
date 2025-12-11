import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import Task from '@/models/Task';
import { updateTaskSchema } from '@/lib/validation';
import { logger } from '@/utils/logger';

// PUT - Update a task
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    // Validation
    const validatedData = updateTaskSchema.parse(body);

    await connectDB();

    // Find task and verify ownership
    const task = await Task.findOne({
      _id: id,
      createdBy: session.user.id,
    });

    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    // Update task
    Object.assign(task, validatedData);
    task.updatedAt = new Date();
    await task.save();

    logger.info('Task updated', { userId: session.user.id, taskId: id });

    return NextResponse.json(
      { message: 'Task updated successfully', task },
      { status: 200 }
    );
  } catch (error: any) {
    logger.error('Error updating task:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a task
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    await connectDB();

    // Find and delete task (verify ownership)
    const task = await Task.findOneAndDelete({
      _id: id,
      createdBy: session.user.id,
    });

    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    logger.info('Task deleted', { userId: session.user.id, taskId: id });

    return NextResponse.json(
      { message: 'Task deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    logger.error('Error deleting task:', error);
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}
