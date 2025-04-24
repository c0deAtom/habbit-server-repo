// app/events/page.tsx or wherever you're listing habits
'use client'

import { useEffect, useState } from "react"
import HabitCard from "@/components/Card"
import Navbar from "../component/Navbar"
import DrawerDemo from "@/components/Drawer"

export default function EventsPage() {
  const [habits, setHabits] = useState([])

  useEffect(() => {
    const fetchHabits = async () => {
      const res = await fetch("/api/habits")
      const data = await res.json()
      setHabits(data)
    }
    fetchHabits()
  }, [])

  const handleAdd = (id: string) => {
    console.log("Added event to:", id)
  }

  const handleRemove = async (id: string) => {
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

     
    } catch (err) {
     'Failed to delete habit'
    }
  };

  return (
    <>
    <Navbar />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-15 my-16">
      {habits.map((habit: any) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onAdd={handleAdd}
          onRemove={handleRemove}
        />
      ))}
    </div>
    <DrawerDemo />
    </>
  )
}


