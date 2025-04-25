'use client';

import { useState, useEffect } from 'react';
import Tag from '../component/Tag';
import { PrismaClient } from '@prisma/client';
import { Habit } from '../habits/page';

const prisma = new PrismaClient();


interface HabitCardProps {
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: any) => void;
  onClose: React.Dispatch<React.SetStateAction<null>>;
  onRefresh: any
  habit: Habit
}

export default function FullView(
  habit
: Habit) {
  const [hitCount, setHitCount] = useState(0);
  const [slipCount, setSlipCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(habit.title);
  const [showMessage, setShowMessage] = useState<string | null>(null);
  const [successRate, setSuccessRate] = useState(0);

  const [eventData, setEventData] = useState(habit.events)


  const [editedDescription, setEditedDescription] = useState(selectedHabit.description || '');
  const [editedPositiveCues, setEditedPositiveCues] = useState<string[]>([])
  const [editedNegativeTriggers, setEditedNegativeTriggers] = useState<string[]>([])
  const [editedMotivators, setEditedMotivators] = useState<string[]>([])
  const [editedSuccessFactors, setEditedSuccessFactors] = useState<string[]>([])

  const getLatestEventIdByType = (type: 'hit' | 'slip') => {
    const latest = selectedHabit.events.filter(event => event.type === type)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];


    return latest?.id ?? null;
  };

  console.log(getLatestEventIdByType('hit'))


  console.log(eventData)



  useEffect(() => {


    // Count hits and slips from events
    const hits = selectedHabit.events.filter(event => event.type === 'hit').length;
    const slips = selectedHabit.events.filter(event => event.type === 'slip').length;
    setHitCount(hits);
    setSlipCount(slips);

  }, [selectedHabit]);

  const getRandomItem = (array: string[]) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const recordEvent = async (type: 'hit' | 'slip') => {
    try {
      // Show random message based on type
      if (type === 'hit' && selectedHabit.positiveCues.length > 0) {
        setShowMessage(`- ${getRandomItem(selectedHabit.positiveCues)} -`);
      } else if (type === 'slip' && selectedHabit.negativeTriggers.length > 0) {
        setShowMessage(`${getRandomItem(selectedHabit.negativeTriggers)}`);
      }

      const response = await fetch(`/api/habits/${selectedHabit.id}/events`, {
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
    onUpdate(selectedHabit.id, {
      title: editedTitle,
      description: editedDescription,
      positiveCues: editedPositiveCues.map(item => item.trim()),
      negativeTriggers: editedNegativeTriggers.map(item => item.trim()),
      motivators: editedMotivators.map(item => item.trim()),
      successFactors: editedSuccessFactors.map(item => item.trim()),
    });
    setIsEditing(false);

  };



  const deleteEvent = async (eventId: string, habitId: string) => {
    try {
      const res = await fetch(`/api/habits/${habitId}/events`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: eventId }), // send the event ID to delete
      });



      const data = await res.json();
      console.log(data);

      onRefresh()




      // Optionally update your UI
    } catch (err) {
      console.error('Error deleting event:', err);
    }

  };















  if (isEditing) {
    return (

      <div className="bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-210 ">
        <div className="flex justify-between  mb-6">





          <h5 className="text-4xl font-bold text-gray-300 text  my-2">
            <input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              style={{ fontSize: '1.5rem' }}
            /></h5>


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
              onClick={() => onDelete(selectedHabit.id)}
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
            className={`p-4 rounded-lg text-center transition-opacity duration-300 h-full flex items-center justify-center ${showMessage
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
              <svg className="w-25 h-25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>

            <span className="mt-3 text-6xl font-bold text-green-700">{hitCount}</span>


            <button onClick={() => {
              deleteEvent(getLatestEventIdByType('hit'), selectedHabit.id)
            }}>
              <svg className="w-12 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19V5m0 14-4-4m4 4 4-4" />
              </svg>

            </button>



          </div>

          <div className="flex flex-raw items-center gap-20 ">
            <button onClick={() => {
              deleteEvent(getLatestEventIdByType('slip'), selectedHabit.id)
            }}>
              <svg className="w-12 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19V5m0 14-4-4m4 4 4-4" />
              </svg>

            </button>

            <span className="mt-3 text-6xl font-bold text-red-700">{slipCount}</span>
            <button
              onClick={() => recordEvent('slip')}
              className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 w-50 h-30"
            >
              <svg className="w-27 h-27" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>




          </div>
        </div>
        <div className="my-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 text-blue-300">

          <div className="bg-gray-600  rounded-lg p-4 w-full max-w-md h-64 overflow-y-auto   ">
            <h2 className="font-semibold text-lg mb-2">Positive Cues</h2>
            <ul className="list-none space-y-3 text-gray-800 dark:text-white ">
              <Tag data={selectedHabit.positiveCues} title="d"
                setData={setEditedPositiveCues} />
            </ul>
          </div>
          <div className="bg-gray-600 shadow-md rounded-lg p-4 w-full max-w-md h-64 overflow-y-auto border  ">
            <h2 className="font-semibold text-lg mb-2">Negative Triggers</h2>
            <ul className="list-none space-y-3 text-gray-800 dark:text-white ">
              <Tag data={selectedHabit.negativeTriggers} title="d"
                setData={setEditedNegativeTriggers} />
            </ul>
          </div>
          <div className="bg-gray-600 shadow-md rounded-lg p-4 w-full max-w-md h-64 overflow-y-auto border  ">
            <h2 className="font-semibold text-lg mb-2">Motivators</h2>
            <ul className="list-none space-y-3 text-gray-800 dark:text-white ">
              <Tag data={selectedHabit.motivators} title="d"
                setData={setEditedMotivators} />
            </ul>
          </div>
          <div className="bg-gray-600 shadow-md rounded-lg p-4 w-full max-w-md h-64 overflow-y-auto border  ">
            <h2 className="font-semibold text-lg mb-2">Success Factors</h2>
            <ul className="list-none space-y-3 text-gray-800 dark:text-white ">
              <Tag data={selectedHabit.successFactors} title="d"
                setData={setEditedSuccessFactors} />
            </ul>
          </div>







        </div>
        <div className="flex justify-end gap-2 pt-2 my-30">
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
    <div className="bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-210 ">
      <div className="flex justify-between  mb-6">
        <h5 className="text-4xl font-bold text-gray-300 text  my-2 font-sans">{selectedHabit.title}</h5>

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
            onClick={() => onDelete(selectedHabit.id)}
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
          className={`p-4 rounded-lg text-center transition-opacity duration-300 h-full flex items-center justify-center ${showMessage
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
            <svg className="w-30 h-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <svg className="w-27 h-27" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>


        </div>
      </div>
      <div className="my-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 text-blue-300  ">
        <div className="bg-gray-600 shadow-md rounded-lg p-4 w-full max-w-md h-64 overflow-y-auto border ">
          <h2 className="font-semibold text-lg mb-2">Positive Cues</h2>
          <ul className="list-none space-y-3 text-gray-800 dark:text-white ">
            {selectedHabit.positiveCues.map((item, index) => (
              <li key={index} className="flex items-center gap-2 hover:text-blue-600 transition text-gray-300 font-mono ">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.153 19 21 12l-4.847-7H3l4.848 7L3 19h13.153Z" />
                </svg>
                {item}</li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-600 shadow-md rounded-lg p-4 w-full max-w-md h-64 overflow-y-auto border  ">
          <h2 className="font-semibold text-lg mb-2">Negative Triggers</h2>
          <ul className="list-none space-y-3 text-gray-800 dark:text-white ">
            {selectedHabit.negativeTriggers.map((item, index) => (
              <li key={index} className="flex items-center gap-2 hover:text-blue-600 transition text-gray-300 font-mono ">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.153 19 21 12l-4.847-7H3l4.848 7L3 19h13.153Z" />
                </svg>
                {item}</li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-600 shadow-md rounded-lg p-4 w-full max-w-md h-64 overflow-y-auto border ">
          <h2 className="font-semibold text-lg mb-2">Motivators</h2>
          <ul className="list-none space-y-3 text-gray-800 dark:text-white ">
            {selectedHabit.motivators.map((item, index) => (
              <li key={index} className="flex items-center gap-2 hover:text-blue-600 transition text-gray-300 font-mono ">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.153 19 21 12l-4.847-7H3l4.848 7L3 19h13.153Z" />
                </svg>
                {item}</li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-600 shadow-md rounded-lg p-4 w-full max-w-md h-64 overflow-y-auto border ">
          <h2 className="font-semibold text-lg mb-2">Success Factors</h2>
          <ul className="list-none space-y-3 text-gray-800 dark:text-white ">
            {selectedHabit.successFactors.map((item, index) => (
              <li key={index} className="flex items-center gap-2 hover:text-blue-600 transition text-gray-300 font-mono ">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.153 19 21 12l-4.847-7H3l4.848 7L3 19h13.153Z" />
                </svg>
                {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
