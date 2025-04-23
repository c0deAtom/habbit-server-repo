
'use client'
import { Button } from "@/components/ui/button"
import { Chart1 } from "./component/Chart1"
import { useState, useEffect } from 'react';
import Events from "@/components/Events"
import Navbar from "./component/Navbar"
import EventsTable from "../components/Events";
import { Habit } from "@prisma/client"

export default function Home() {






  return (
    <div className="">
      <div>

        <Navbar />
      </div>
     <h1 className=" my-60 flex items-center justify-center text-6xl font font-sans-">Welcome User</h1>
        </div>
    
   
  )
}
