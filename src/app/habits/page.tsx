"use client";

import { useEffect, useState } from "react";

type Habit = {
  id: number;
  name: string;
  positive: number;
  negative: number;
};

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState("");

  useEffect(() => {
    const fetchHabits = async () => {
      const res = await fetch("/api/habits");
      const data = await res.json();
      setHabits(data);
    };

    fetchHabits();
  }, []);

  const addHabit = async () => {
    if (!newHabit.trim()) return;

    const res = await fetch("/api/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newHabit }),
    });

    const data = await res.json();
    setHabits([...habits, data]);
    setNewHabit("");
  };

  const updateCount = async (id: number, type: "positive" | "negative") => {
    const habit = habits.find((h) => h.id === id);
    if (!habit) return;

    const updated = {
      id,
      positive: type === "positive" ? habit.positive + 1 : habit.positive,
      negative: type === "negative" ? habit.negative + 1 : habit.negative,
    };

    const res = await fetch("/api/habits", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    if (res.ok) {
      const updatedHabit = await res.json();
      setHabits(
        habits.map((h) => (h.id === id ? updatedHabit : h))
      );
    } else {
      console.error("Failed to update habit count");
    }
  };

  return (
    <div className="min-h-screen bg-gray-700 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Habits</h1>

      <div className="flex justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Add new habit"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 focus:outline-none"
        />
        <button
          onClick={addHabit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Habit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className="bg-white rounded shadow p-4 flex flex-col items-center"
          >
            <h2 className="text-xl font-semibold mb-2">{habit.name}</h2>
            <div className="flex gap-4 items-center">
              <button
                onClick={() => updateCount(habit.id, "positive")}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                👍 {habit.positive}
              </button>
              <button
                onClick={() => updateCount(habit.id, "negative")}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                👎 {habit.negative}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
