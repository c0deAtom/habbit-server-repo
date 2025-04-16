/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import HabitCard from "../component/HabitCard";
import Navbar from "../../../component/Navbar";

type CountLog = {
  type: "green" | "red";
  timestamp: number;
};

type HabitData = {
  id: string;
  name: string;
  logs: CountLog[];
};

export default function HabitDashboard() {
  const [habits, setHabits] = useState<HabitData[]>([]);

  // Load habits from DB on first load
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await fetch("/api/habits");
        const dbHabits = await res.json();

        // Merge DB habits with local logs from localStorage
        const local = JSON.parse(localStorage.getItem("habits") || "[]");

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const merged = dbHabits.map((dbHabit: any) => {
          const localMatch = local.find((h: any) => h.id === dbHabit.id);
          return {
            id: dbHabit.id,
            name: dbHabit.name,
            logs: localMatch?.logs || [],
          };
        });

        setHabits(merged);
      } catch (err) {
        console.error("Failed to fetch habits:", err);
      }
    };

    fetchHabits();
  }, []);

  // Save logs only to localStorage
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = async () => {
    const name = prompt("Enter habit name:");
    if (!name) return;

    const newHabit = {
      id: crypto.randomUUID(),
      name,
      logs: [],
    };

    setHabits((prev) => [...prev, newHabit]);

    // Save to DB
    try {
      await fetch("/api/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: newHabit.id, name }),
      });
    } catch (err) {
      console.error("Failed to save habit to DB", err);
    }
  };

  const updateLogs = (id: string, logs: CountLog[]) => {
    setHabits((prev) =>
      prev.map((habit) => (habit.id === id ? { ...habit, logs } : habit))
    );
  };

  const deleteHabit = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this habit?");
    if (!confirmDelete) return;
  
    try {
      // Delete from database
      await fetch("/api/habits", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
  
      // Delete from local state
      setHabits((prev) => prev.filter((habit) => habit.id !== id));
    } catch (err) {
      console.error("Failed to delete habit:", err);
    }
  };

  
  

  return (
    <>
    <Navbar />
    <div className="p-10 bg-black min-h-screen text-white">
      <h1 className="text-center text-4xl font-bold mb-8">Habit Tracker</h1>

      <div className="text-center mb-8">
        <button
          onClick={addHabit}
          className="text-3xl bg-blue-600 text-white border-none px-6 py-3 rounded-full hover:bg-blue-700 transition duration-200" >
          +
        </button>
      </div>
      <div className="flex items-center gap-12 flex-wrap justify-center">
  {habits.map((habit) => (
    <div key={habit.id} style={{ position: "relative" }}>

      <HabitCard
        id={habit.id}
        name={habit.name}
        logs={habit.logs}
        onLogsChange={(logs) => updateLogs(habit.id, logs)}
        onDelete={() => deleteHabit(habit.id)} 
      />
     
    </div>
  ))}
</div>

  


          
          
        
      </div>
      </>
    
  );
}
