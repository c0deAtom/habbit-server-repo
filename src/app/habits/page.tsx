"use client";
import { useEffect, useState } from "react";
import HabitCard from "../component/HabitCard";
import SimpleHabitForm from "../component/SimpleHabitForm";
import Modal from "../component/Modal";
import Navbar from "../component/Navbar";

interface Habit {
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
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchHabits = async () => {
    try {
      const response = await fetch('/api/habits');
      if (!response.ok) {
        throw new Error('Failed to fetch habits');
      }
      const data = await response.json();
      setHabits(data);
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

      const newHabit = await response.json();
      setHabits([...habits, newHabit]);
      setIsModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create habit');
    }
  };

  const handleDeleteHabit = async (id: string) => {
    try {
      const response = await fetch(`/api/habits/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete habit');
      }

      setHabits(habits.filter(habit => habit.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete habit');
    }
  };

  const handleUpdateHabit = async (id: string, data: any) => {
    try {
      const response = await fetch(`/api/habits/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update habit');
      }

      const updatedHabit = await response.json();
      setHabits(habits.map(habit => 
        habit.id === id ? updatedHabit : habit
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update habit');
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="p-10 bg-gray-100 min-h-screen">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="mx-40 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="font-semibold">Add New Habit</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-800 mx-50">Habit Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              {...habit}
              onDelete={handleDeleteHabit}
              onUpdate={handleUpdateHabit}
            />
          ))}
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Create New Habit</h2>
            <p className="text-gray-600 mt-2">Fill in the details to start tracking your new habit</p>
          </div>
          <SimpleHabitForm onSubmit={handleCreateHabit} />
        </Modal>
      </div>
    </>
  );
}
