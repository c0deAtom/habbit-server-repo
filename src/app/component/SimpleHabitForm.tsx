'use client';

import { useState } from 'react';
import Tag from './Tag';

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
  const [positiveCues, setPositiveCues] = useState<string[]>([]);
  const [negativeTriggers, setNegativeTriggers] = useState<string[]>([]);
  const [motivators, setMotivators] = useState<string[]>([]);
  const [successFactors, setSuccessFactors] = useState<string[]>([]);
  const [userId, setUserId] = useState('010b6549-a538-49b0-a2f5-c27082fa3811')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
        userId,
      title,
      description: description || null,
      positiveCues: positiveCues.map(cue => cue.trim()).filter(Boolean),
      negativeTriggers: negativeTriggers.map(trigger => trigger.trim()).filter(Boolean),
      motivators: motivators.map(motivator => motivator.trim()).filter(Boolean),
      successFactors: successFactors.map(factor => factor.trim()).filter(Boolean),

    });

    // Reset form
    setTitle('');
    setDescription('');
    setPositiveCues([]);
    setNegativeTriggers([]);
    setMotivators([]);
    setSuccessFactors([]);
    
  };

 

  return (
    
    <form onSubmit={handleSubmit} className="bg-gray-200 p-6 rounded-lg shadow-md h-72 max-w-2xl mx-auto">
     
      
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
        <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Habit
          </button>

        <Tag data={positiveCues} title="Positive Cues"
      setData={setPositiveCues}/>

       <Tag data={negativeTriggers}
       setData={setNegativeTriggers} title="Negetive Triggers"/>


      <Tag data={motivators}
      setData={setMotivators}
      title="Motivators"
      />


      <Tag data={successFactors}
      title="Success Factors"
      setData={setSuccessFactors}/>
 

        <div className="pt-4">
        
        </div>
      </div>
    </form>
  );
} 