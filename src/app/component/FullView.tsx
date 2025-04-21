'use client';

import { useState, useEffect } from 'react';
import Tag from '../component/Tag';

interface HabitCardProps {
  id: string;
  title: string;
  description: string | null;
  positiveCues: string[];
  negativeTriggers: string[];
  motivators: string[];
  successFactors: string[];
  events: {
    id: string;
    type: 'hit' | 'slip';
    notes: string | null;
    createdAt: string;
  }[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: any) => void;
  onClose: React.Dispatch<React.SetStateAction<null>>;
}

export default function FullView({
  id,
  title,
  positiveCues,
  negativeTriggers,
  events,
  onDelete,
  onUpdate,
  description,
  motivators,
  successFactors,
  onClose,

}: HabitCardProps) {
  const [hitCount, setHitCount] = useState(0);
  const [slipCount, setSlipCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [showMessage, setShowMessage] = useState<string | null>(null);
  const [successRate, setSuccessRate] = useState(0);


  const [editedDescription, setEditedDescription] = useState(description || '');
const [editedPositiveCues, setEditedPositiveCues] = useState<string[]>([])
const [editedNegativeTriggers, setEditedNegativeTriggers] = useState<string[]>([])
const [editedMotivators, setEditedMotivators] = useState<string[]>([])
const [editedSuccessFactors, setEditedSuccessFactors] = useState<string[]>([])




 

  useEffect(() => {
    // Count hits and slips from events
    const hits = events.filter(event => event.type === 'hit').length;
    const slips = events.filter(event => event.type === 'slip').length;
    setHitCount(hits);
    setSlipCount(slips);
  }, [events]);

  const getRandomItem = (array: string[]) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const recordEvent = async (type: 'hit' | 'slip') => {
    try {
      // Show random message based on type
      if (type === 'hit' && positiveCues.length > 0) {
        setShowMessage(`- ${getRandomItem(positiveCues)} -`);
      } else if (type === 'slip' && negativeTriggers.length > 0) {
        setShowMessage(`${getRandomItem(negativeTriggers)}`);
      }

      const response = await fetch(`/api/habits/${id}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type }),
      });

      if (!response.ok) {
        throw new Error('Failed to record event');
      }

      // Update counts immediately
      if (type === 'hit') {
        setHitCount(prev => prev + 1);
      } else {
        setSlipCount(prev => prev + 1);
      }

      // Hide message after 3 seconds
      setTimeout(() => {
        setShowMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error recording event:', error);
    }
  };

  const handleUpdate = () => {
    onUpdate(id, {
      title: editedTitle,
      description: editedDescription,
      positiveCues: editedPositiveCues.map(item => item.trim()),
      negativeTriggers: editedNegativeTriggers.map(item => item.trim()),
      motivators: editedMotivators.map(item => item.trim()),
      successFactors: editedSuccessFactors.map(item => item.trim()),
    });
    setIsEditing(false);
  };
  

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md space-y-4 text-gray-600">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          placeholder="Title"
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
  
      <textarea
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
        placeholder="Description"
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
  
      <Tag data={positiveCues} title="Positive Cues"
      setData={setEditedPositiveCues}/>

       <Tag data={negativeTriggers}
       setData={setEditedNegativeTriggers} title="Negetive Triggers"/>


      <Tag data={motivators}
      setData={setEditedMotivators}
      title="Motivators"
      />


      <Tag data={successFactors}
      title="Success Factors"
      setData={setEditedSuccessFactors}/>
 
 
     
  
      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
        >
          Save
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className="bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
    );
  }

  return (
    <div className="bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-180 ">
      <div className="flex justify-between  mb-6">
        <h5 className="text-4xl font-bold text-gray-300 text mx-150 my-2">{title}</h5>
        <div className="flex space-x-3 ">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(id)}
            className="text-red-600 hover:text-red-800 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <button
            onClick={() => onClose(null)}
            className="text-red-600 hover:text-red-800 transition-colors duration-200"
          >
            <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-6 w-6 cursor-pointer text-gray-600 hover:text-red-600"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={2}
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M6 18L18 6M6 6l12 12"
  />
</svg>
          </button>
        </div>
      </div>

    <div className="mb-6 h-4 transition-all duration-300">
  <div
    className={`p-4 rounded-lg text-center transition-opacity duration-300 h-full flex items-center justify-center ${
      showMessage
        ? showMessage.includes('-')
          ? 'opacity-100 bg-green-50 text-green-800 border border-green-200'
          : 'opacity-100 bg-red-50 text-red-800 border border-red-200'
        : 'opacity-0'
    }`}
  >
    <p className="font-medium">{showMessage || ' '}</p>
  </div>
</div>
    

      <div className="flex gap-150 justify-center">
        <div className="flex flex-raw gap-20 items-center ">
      
          <button 
            onClick={() => recordEvent('hit')}
            className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 w-50 h-30"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
          <span className="mt-3 text-6xl font-bold text-green-700">{hitCount}</span>
         
        </div>

        <div className="flex flex-raw items-center gap-20 ">
        <span className="mt-3 text-6xl font-bold text-red-700">{slipCount}</span>
          <button
            onClick={() => recordEvent('slip')} 
            className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 w-50 h-30"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
         
      
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 text-blue-300">
      <div className="bg-white shadow-md rounded-lg p-4 ">
        <h2 className="font-semibold text-lg mb-2">positiveCues</h2>
        <ul className="space-y-1">
          {positiveCues.map((item, index) => (
            <li key={index} className="text-gray-700">{item}</li>
          ))}
        </ul>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="font-semibold text-lg mb-2">negativeTriggers</h2>
        <ul className="space-y-1">
          {negativeTriggers.map((item, index) => (
            <li key={index} className="text-gray-700">{item}</li>
          ))}
        </ul>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="font-semibold text-lg mb-2">motivators</h2>
        <ul className="space-y-1">
          {motivators.map((item, index) => (
            <li key={index} className="text-gray-700">{item}</li>
          ))}
        </ul>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="font-semibold text-lg mb-2">successFactors</h2>
        <ul className="space-y-1">
          {successFactors.map((item, index) => (
            <li key={index} className="text-gray-700">{item}</li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
}
