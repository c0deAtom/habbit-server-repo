import { Payment, columns } from "./colums"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
    
    const fetchHabits = async () => {
        console.log('ran')
        try {
          const response = await fetch('/api/habits');
          if (!response.ok) {
            throw new Error('Failed to fetch habits');
          }
          const data = await response.json();
          const newEvent =  data.flatMap(habit =>
            habit.events.map(event => ({
              ...event,
              habitName: habit.title,
            }))
          );
          console.log(newEvent)
    
    
        } catch (err) {
         
        } finally {
         
        }
      };

    
    
     
  return [
    {
      id: "728ed52f",
      amunt: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
