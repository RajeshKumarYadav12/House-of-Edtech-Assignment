import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { suggestTaskImprovements } from '@/utils/ai';
import { logger } from '@/utils/logger';

// POST - Generate AI suggestions for a task
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
    const { description } = body;

    if (!description || typeof description !== 'string') {
      return NextResponse.json(
        { error: 'Please provide a task description' },
        { status: 400 }
      );
    }

    if (description.trim().length < 10) {
      return NextResponse.json(
        { error: 'Description must be at least 10 characters' },
        { status: 400 }
      );
    }

    logger.info('Generating AI suggestions', { userId: session.user.id });

    // Generate AI suggestions
    const suggestions = await suggestTaskImprovements(description);

    logger.info('AI suggestions generated successfully', { userId: session.user.id });

    return NextResponse.json(
      { 
        message: 'AI suggestions generated successfully',
        suggestions 
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error('Error generating AI suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to generate AI suggestions. Please try again.' },
      { status: 500 }
    );
  }
}
