import OpenAI from 'openai';
import { AISuggestions, TaskPriority } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate a better task title based on description
 */
export async function generateBetterTitle(description: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that creates concise, clear task titles. Generate a short title (max 6 words) that captures the essence of the task description.',
        },
        {
          role: 'user',
          content: `Create a concise task title for: ${description}`,
        },
      ],
      max_tokens: 50,
      temperature: 0.7,
    });

    return response.choices[0].message.content?.trim().replace(/^["']|["']$/g, '') || description.substring(0, 50);
  } catch (error) {
    console.error('Error generating title:', error);
    // Fallback: Create a simple title from description
    const words = description.split(' ').slice(0, 6).join(' ');
    return words.length > 0 ? words : 'New Task';
  }
}

/**
 * Generate priority based on task description
 */
export async function generatePriority(description: string): Promise<TaskPriority> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a task prioritization expert. Analyze the task description and respond with ONLY ONE WORD: "low", "medium", or "high". Consider urgency, importance, and impact.',
        },
        {
          role: 'user',
          content: `What priority should this task have: ${description}`,
        },
      ],
      max_tokens: 10,
      temperature: 0.3,
    });

    const priority = response.choices[0].message.content?.trim().toLowerCase() as TaskPriority;
    
    if (['low', 'medium', 'high'].includes(priority)) {
      return priority;
    }
    
    return 'medium';
  } catch (error) {
    console.error('Error generating priority:', error);
    // Fallback: Return medium priority
    return 'medium';
  }
}

/**
 * Generate a realistic deadline based on task description
 */
export async function generateDeadline(description: string): Promise<string> {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a project management expert. Based on the task description, suggest a realistic deadline. Today's date is ${today}. Respond with ONLY a date in YYYY-MM-DD format, typically 1-30 days from today depending on task complexity.`,
        },
        {
          role: 'user',
          content: `When should this task be completed: ${description}`,
        },
      ],
      max_tokens: 20,
      temperature: 0.5,
    });

    const dateStr = response.choices[0].message.content?.trim() || '';
    
    const date = new Date(dateStr);
    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toISOString();
    }
    
    const defaultDeadline = new Date();
    defaultDeadline.setDate(defaultDeadline.getDate() + 7);
    return defaultDeadline.toISOString();
  } catch (error) {
    console.error('Error generating deadline:', error);
    // Fallback: Return 7 days from now
    const defaultDeadline = new Date();
    defaultDeadline.setDate(defaultDeadline.getDate() + 7);
    return defaultDeadline.toISOString();
  }
}

/**
 * Generate all AI suggestions at once
 */
export async function generateAllSuggestions(description: string): Promise<AISuggestions> {
  try {
    const [title, priority, deadline] = await Promise.all([
      generateBetterTitle(description),
      generatePriority(description),
      generateDeadline(description),
    ]);

    return { title, priority, deadline };
  } catch (error) {
    console.error('Error generating suggestions:', error);
    // Return fallback suggestions if AI fails
    const words = description.split(' ').slice(0, 6).join(' ');
    const defaultDeadline = new Date();
    defaultDeadline.setDate(defaultDeadline.getDate() + 7);
    
    return {
      title: words.length > 0 ? words : 'New Task',
      priority: 'medium' as TaskPriority,
      deadline: defaultDeadline.toISOString()
    };
  }
}

/**
 * Improve task details using AI
 */
export async function suggestTaskImprovements(description: string): Promise<AISuggestions> {
  return generateAllSuggestions(description);
}
