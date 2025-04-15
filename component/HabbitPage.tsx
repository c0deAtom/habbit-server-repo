"use client";

import { useState } from "react";

type Habit = {
  id: number;
  name: string;
};

export default function HabitTracker() {
  const [habitName, setHabitName] = useState("");
  const [habits, setHabits] = useState<Habit[]>([]);

  const addHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!habitName.trim()) return;

    const newHabit = { id: Date.now(), name: habitName.trim() };
    setHabits([...habits, newHabit]);
    setHabitName("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Habit Tracker</h1>

      <form onSubmit={addHabit} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Enter a habit..."
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          className="px-4 py-2 rounded text-black w-full"
        />
        <button type="submit" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
          Add
        </button>
      </form>

      <div className="grid gap-4">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className="p-4 bg-gray-800 rounded shadow hover:bg-gray-700 transition"
          >
            {habit.name}
          </div>
        ))}
      </div>
    </div>
  );
}
