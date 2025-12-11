import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import Task from '@/models/Task';
import { taskSchema } from '@/lib/validation';
import { logger } from '@/utils/logger';

// GET - Fetch all tasks for the logged-in user
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const tasks = await Task.find({ createdBy: session.user.id })
      .sort({ createdAt: -1 });

    logger.info('Tasks fetched', { userId: session.user.id, count: tasks.length });

    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    logger.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST - Create a new task
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validation
    const validatedData = taskSchema.parse(body);

    await connectDB();

    const task = await Task.create({
      ...validatedData,
      status: validatedData.status || 'todo',
      createdBy: session.user.id,
    });

    logger.info('Task created', { userId: session.user.id, taskId: task._id });

    return NextResponse.json(
      { message: 'Task created successfully', task },
      { status: 201 }
    );
  } catch (error: any) {
    logger.error('Error creating task:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}
