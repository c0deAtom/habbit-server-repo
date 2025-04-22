"use client"


import Onboarding from "@/app/component/Front"
import Link from "next/link";


import Navbar from "@/app/component/Navbar"

import HabitCard from "./component/HabitCard";
import { useState, } from "react";
import { Habit } from "@prisma/client";
import { useEffect } from "react";

export default function Home() {


  const tools = [
    {
      title: "Habit Tracker",
      description: "Track and manage your daily habits.",
      href: "/habits",
    },
    {
      title: "Events",
      description: "View and manage habit events.",
      href: "/events",
    },
    {
      title: "Analytics",
      description: "Visualize progress and trends.",
      href: "/analytics",
    },
    {
      title: "Settings",
      description: "Customize your experience.",
      href: "/settings",
    },
  ];

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
   
    
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);



  return (
  <>
    <div className="bg-gray-700">
    <Navbar />

<main className="min-h-screen p-6 bg-gray-700 ">
      <h1 className="text-2xl font-bold mb-6 text-center ">Your Tools</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-45 m-30">
      <>
    <div className="bg-gray-700">
    <Navbar />

<main className="min-h-screen p-6 bg-gray-700 ">
<div className="bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-300">{"title"}</h3>
        <div className="flex space-x-3">
          <button
            
          
            className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
             
            className="text-red-600 hover:text-red-800 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

    <div className="mb-6 h-4 transition-all duration-300">
 
</div>
   
      <div className="flex gap-8 justify-center">
        <div className="flex flex-col items-center">
          <button 
        
            
            className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
          <span className="mt-3 text-2xl font-bold text-green-700">{"hitCount"}</span>
          <span className="text-sm text-gray-500">Hits</span>
        </div>

        <div className="flex flex-col items-center">
          <button
            
            className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <span className="mt-3 text-2xl font-bold text-red-700">{"slipCount"}</span>
          <span className="text-sm text-gray-500">Slips</span>
        </div>
      </div>
    </div>
    </main>



</div>
</>
    
     
      </div>
    </main>



</div>
</>
    
     
    
    

    
    

  
  
  );
}



// app/page.tsx or your main dashboard pa
