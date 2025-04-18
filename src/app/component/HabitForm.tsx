'use client';

import { useState } from 'react';

interface HabitFormProps {
  onSubmit: (data: {
    title: string;
    description: string | null;
    positiveCues: string[];
    negativeTriggers: string[];
    motivators: string[];
    successFactors: string[];
  }) => void;
}

export default function HabitForm({ onSubmit }: HabitFormProps) {
  const [title, setTitle] = useState('Daily Journaling');
  const [description, setDescription] = useState<string | null>('Write in my journal for at least 15 minutes each day');
  const [positiveCues, setPositiveCues] = useState('morning coffee, quiet space, favorite pen');
  const [negativeTriggers, setNegativeTriggers] = useState('distractions, tiredness, lack of time');
  const [motivators, setMotivators] = useState('self-reflection, stress relief, personal growth');
  const [successFactors, setSuccessFactors] = useState('consistent time, comfortable space, clear prompts');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
      title,
      description,
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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Habit Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description || ''}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={3}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="positiveCues">
          Positive Cues (comma separated)
        </label>
        <input
          id="positiveCues"
          type="text"
          value={positiveCues}
          onChange={(e) => setPositiveCues(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g. morning alarm, workout clothes, water bottle"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="negativeTriggers">
          Negative Triggers (comma separated)
        </label>
        <input
          id="negativeTriggers"
          type="text"
          value={negativeTriggers}
          onChange={(e) => setNegativeTriggers(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g. stress, tiredness, distractions"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="motivators">
          Motivators (comma separated)
        </label>
        <input
          id="motivators"
          type="text"
          value={motivators}
          onChange={(e) => setMotivators(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g. health, energy, confidence"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="successFactors">
          Success Factors (comma separated)
        </label>
        <input
          id="successFactors"
          type="text"
          value={successFactors}
          onChange={(e) => setSuccessFactors(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g. preparation, consistency, support"
        />
      </div>

      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Habit
        </button>
      </div>
    </form>
  );
} 