import * as React from "react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Habit } from "@prisma/client"
import { format, isToday, isYesterday, subDays, isAfter } from "date-fns"

type DrawerHabitDetailsProps = {
  open: boolean
  onClose: () => void
  habit: Habit & {
    events: {
      id: string
      type: "hit" | "slip"
      notes: string | null
      createdAt: string
    }[]
  } | null
}

function transformEventsToChartData(events: DrawerHabitDetailsProps["habit"]["events"]) {
  const today: Record<string, { hits: number; slips: number }> = {}
  const yesterday: Record<string, { hits: number; slips: number }> = {}
  const last7Days: Record<string, { hits: number; slips: number }> = {}

  events.forEach((event) => {
    const date = new Date(event.createdAt)
    const hour = format(date, "h a")
    const day = format(date, "EEE")

    const target = isToday(date)
      ? today
      : isYesterday(date)
      ? yesterday
      : isAfter(date, subDays(new Date(), 7))
      ? last7Days
      : null

    if (target) {
      const key = isToday(date) || isYesterday(date) ? hour : day
      if (!target[key]) target[key] = { hits: 0, slips: 0 }
      target[key][event.type === "hit" ? "hits" : "slips"]++
    }
  })

  return {
    today: Object.entries(today).map(([hour, value]) => ({ hour, ...value })),
    yesterday: Object.entries(yesterday).map(([hour, value]) => ({ hour, ...value })),
    last7Days: Object.entries(last7Days).map(([day, value]) => ({ day, ...value })),
  }
}

export default function DrawerHabitDetails({ open, onClose, habit }: DrawerHabitDetailsProps) {
  const [filter, setFilter] = React.useState<"today" | "yesterday" | "last7Days">("today")

  if (!habit) return null

  const chartData = transformEventsToChartData(habit.events)
  const dataForChart = chartData[filter] || []

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="p-6">
        <DrawerHeader>
          <DrawerTitle className="text-4xl font-mono">{habit.title}</DrawerTitle>
          <DrawerDescription className="text-brown-600 ">{habit.description || "No description."}</DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-6 md:flex-row">
          {/* Selected Habit Card */}
          <div className="flex-1 bg-gray-50 p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">Cues & Motivators</h3>
            <p className="text-sm text-gray-600"><strong>Positive Cues:</strong> {habit.positiveCues.join(", ")}</p>
            <p className="text-sm text-gray-600"><strong>Negative Triggers:</strong> {habit.negativeTriggers.join(", ")}</p>
            <p className="text-sm text-gray-600"><strong>Motivators:</strong> {habit.motivators.join(", ")}</p>
            <p className="text-sm text-gray-600"><strong>Success Factors:</strong> {habit.successFactors.join(", ")}</p>
          </div>

          {/* Graph */}
          <div className="flex-1 bg-white p-4 rounded-xl shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Progress Graph</h3>
              <div className="space-x-2">
                <Button size="sm" variant={filter === "today" ? "default" : "outline"} onClick={() => setFilter("today")}>Today</Button>
                <Button size="sm" variant={filter === "yesterday" ? "default" : "outline"} onClick={() => setFilter("yesterday")}>Yesterday</Button>
                <Button size="sm" variant={filter === "last7Days" ? "default" : "outline"} onClick={() => setFilter("last7Days")}>Last 7 Days</Button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dataForChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={filter === "last7Days" ? "day" : "hour"} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="hits" stroke="#10B981" name="Hits" />
                <Line type="monotone" dataKey="slips" stroke="#EF4444" name="Slips" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Empty or Custom Component Placeholder */}
          <div className="flex-1 bg-gray-100 p-4 rounded-xl shadow flex items-center justify-center text-gray-400">
            {/* Future enhancement or user tips */}
            <p>🧠 Tips & Suggestions Coming Soon</p>
          </div>
        </div>

        <DrawerFooter>
          <Button>Track Habit</Button>
          <DrawerClose>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
