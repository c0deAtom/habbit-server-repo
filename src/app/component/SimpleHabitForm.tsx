'use client';

import { useState } from 'react';

interface SimpleHabitFormProps {
  onSubmit: (data: {
    userId: string
    title: string;
    description: string | null;
    positiveCues: string[];
    negativeTriggers: string[];
    motivators: string[];
    successFactors: string[];
  }) => void;
}

export default function SimpleHabitForm({ onSubmit }: SimpleHabitFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [positiveCues, setPositiveCues] = useState('');
  const [negativeTriggers, setNegativeTriggers] = useState('');
  const [motivators, setMotivators] = useState('');
  const [successFactors, setSuccessFactors] = useState('');
  const [userId, setUserId] = useState('010b6549-a538-49b0-a2f5-c27082fa3811')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
        userId,
      title,
      description: description || null,
      positiveCues: positiveCues.split(',').map(cue => cue.trim()).filter(Boolean),
      negativeTriggers: negativeTriggers.split(',').map(trigger => trigger.trim()).filter(Boolean),
      motivators: motivators.split(',').map(motivator => motivator.trim()).filter(Boolean),
      successFactors: successFactors.split(',').map(factor => factor.trim()).filter(Boolean),

    });

    // Reset form
    setTitle('');
    setDescription('');
    setPositiveCues('');
    setNegativeTriggers('');
    setMotivators('');
    setSuccessFactors('');
    
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-200 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
     
      
      <div className="space-y-4 ">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full text-gray-600 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            placeholder="e.g. Daily Meditation"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            placeholder="e.g. 15 minutes of mindfulness meditation"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Positive Cues (comma separated)</label>
          <input
            type="text"
            value={positiveCues}
            onChange={(e) => setPositiveCues(e.target.value)}
            className="mt-1 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g. morning sunlight, quiet space, meditation app"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Negative Triggers (comma separated)</label>
          <input
            type="text"
            value={negativeTriggers}
            onChange={(e) => setNegativeTriggers(e.target.value)}
            className="mt-1 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g. noise, distractions, lack of time"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Motivators (comma separated)</label>
          <input
            type="text"
            value={motivators}
            onChange={(e) => setMotivators(e.target.value)}
            className="mt-1 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g. mental clarity, stress reduction, spiritual growth"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Success Factors (comma separated)</label>
          <input
            type="text"
            value={successFactors}
            onChange={(e) => setSuccessFactors(e.target.value)}
            className="mt-1 block w-full text-gray-900   rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g. waking up early, dedicated space, guided sessions"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Habit
          </button>
        </div>
      </div>
    </form>
  );
} 