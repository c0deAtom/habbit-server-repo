"use client";
import { useEffect, useState } from "react";
import HabitCard from "../component/HabitCard";
import SimpleHabitForm from "../component/SimpleHabitForm";
import Modal from "../component/Modal";
import Navbar from "../component/Navbar";
import FullView from "../component/FullView"

export interface Habit {
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
}

export default function HabitDashboard() {
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);




  



  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchHabits = async () => {
    console.log('ran')
    try {
      const response = await fetch('/api/habits');
      if (!response.ok) {
        throw new Error('Failed to fetch habits');
      }
      const data = await response.json();
      setHabits(data);
      const currentHabit = data.find((item) => item.id === selectedHabit?.id)
      setSelectedHabit(currentHabit || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleCreateHabit = async (data: {
    
    title: string;
    description: string | null;
    positiveCues: string[];
    negativeTriggers: string[];
    motivators: string[];
    successFactors: string[];
  }) => {
    try {
      const response = await fetch('/api/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create habit');
      }

      // Refresh habits list and close modal
      fetchHabits();
      setIsModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create habit');
    }
  };

  const handleDeleteHabit = async (id: string) => {
    try {
      const response = await fetch('/api/habits/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete habit');
      }

      // Refresh habits list
      fetchHabits();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete habit');
    }
  };

  
  

  const handleUpdateHabit = async (id: string, data: any) => {
    try {
      const response = await fetch('/api/habits', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...data }),
      });

      if (!response.ok) {
        throw new Error('Failed to update habsdfsit');
      }

      // Refresh habits list
      fetchHabits();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update habit');
    }
  };

  if (isLoading) {
    return( <>
    <Navbar />
     <div className="flex items-center justify-center h-screen bg-gray-800 w-full">
      
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-blue-700 font-semibold text-lg">Loading, please wait...</p>
      
    </div>
    </>)
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  

  return (
    <>
      <Navbar />
      <div className="p-10 bg-gray-800 min-h-screen">

        <h1 className="text-center text-4xl font-bold mb-8 text-gray-800">Habit Dashboard</h1>

        
        {selectedHabit ? (
        // Full-screen view
        <div>
          
           
         

          <FullView
                key={selectedHabit.id}
                selectedHabit={selectedHabit}
                onDelete={handleDeleteHabit}
                onUpdate={handleUpdateHabit}
                onClose={setSelectedHabit as any}
                onRefresh={() => {
                  fetchHabits();
                }}
              />
        </div>
      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {habits.map((habit) => (
            <div onClick={() => {setSelectedHabit(habit)}}>
              <HabitCard
                key={habit.id}
                {...habit}
                onDelete={handleDeleteHabit}
                onUpdate={handleUpdateHabit}
              />
            </div>
          ))}
        </div>)}

        {/* Floating Add Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>

        {/* Modal with Habit Form */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-black text-center text-3xl pb-5"> Are you ready to hear me, even when my voice is nothing but silence?</h2>
          <SimpleHabitForm onSubmit={(xx) => {
            handleCreateHabit(xx);
            console.log(xx);
          }} />
        </Modal>

        

         
              
     
     

      </div>
    </>
  );
}
