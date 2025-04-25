import * as React from "react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Habit } from "@prisma/client"
  

export default function DrawerDemo(  habitData: any) {
  const [open, setOpen] = React.useState(true)
  

  

  return (
    <Drawer open={open} >
   
    
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Are you ab {habitData.title}solutely sure?</DrawerTitle>
       
        <DrawerDescription>This action cannot be undone.</DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <Button>Submit</Button>
        <DrawerClose>
          <Button onClick={() => {setOpen(false)}} variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
  
  )
}


