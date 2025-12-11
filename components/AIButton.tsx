'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Sparkles, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { AISuggestions } from '@/types';

interface AIButtonProps {
  description: string;
  onSuggestionsReceived: (suggestions: AISuggestions) => void;
}

export default function AIButton({ description, onSuggestionsReceived }: AIButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleAIClick = async () => {
    if (!description || description.trim().length < 10) {
      toast.error('Please provide a detailed description (at least 10 characters)');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to generate AI suggestions');
      }

      const data = await response.json();
      onSuggestionsReceived(data.suggestions);
      toast.success('✨ AI suggestions applied successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get AI suggestions';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleAIClick}
      disabled={loading}
      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
      size="lg"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Generating AI Suggestions...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-5 w-5" />
          ✨ AI Improve Task
        </>
      )}
    </Button>
  );
}
