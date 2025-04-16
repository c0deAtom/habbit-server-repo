"use client";

import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type CountLog = {
  type: "green" | "red";
  timestamp: number;
};

type Props = {
  id: string;
  name: string;
  logs: CountLog[];
  onLogsChange: (logs: CountLog[]) => void;
  onDelete: () => void; 
};

export default function HabitCard({ id, name, logs, onLogsChange, onDelete }: Props) {
  const addLog = async (type: "green" | "red") => {
    const newLogs = [...logs, { type, timestamp: Date.now() }];
    onLogsChange(newLogs);
  
    // Save to database
    try {
      await fetch("/api/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          
        }),
      });
    } catch (err) {
      console.error("Failed to sync with database:", err);
    }
  
    // Save to localStorage
    const storedHabits = JSON.parse(localStorage.getItem("habits") || "[]");
    const updatedHabits = storedHabits.map((h: any) =>
      h.id === id ? { ...h, logs: newLogs } : h
    );
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
  };
  

  const processData = () => {
    const green = logs.filter((log) => log.type === "green");
    const red = logs.filter((log) => log.type === "red");

    const toChartData = (entries: CountLog[]) => {
      const result: number[] = [];
      for (let i = 1; i < entries.length; i++) {
        const diffSec = Math.floor((entries[i].timestamp - entries[i - 1].timestamp) / 1000);
        result.push(diffSec);
      }
      return result;
    };

    return {
      labels: Array.from({ length: Math.max(green.length, red.length) -1 }, (_, i) => `${i + 1}`),
      greenData: toChartData(green),
      redData: toChartData(red),
    };
  };

  const { labels, greenData, redData } = processData();

  const chartData = {
    labels,
    datasets: [
      {
        label: "Green Count Gap (s)",
        data: greenData,
        borderColor: "green",
        backgroundColor: "rgba(0,255,0,0.2)",
      },
      {
        label: "Red Count Gap (s)",
        data: redData,
        borderColor: "red",
        backgroundColor: "rgba(255,0,0,0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Time Gaps Between Counts",
      },
      
    },
  };

  
  

  
  

  return (
    <div style={styles.card}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={styles.title}>{name}</h2>
        <button
          onClick={onDelete}
          style={{
            background: "transparent",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            color: "#f87171",
          }}
          title="Delete Habit"
        >
          🗑️
        </button>
      </div>
  
      <div style={styles.buttonRow}>
        <button onClick={() => addLog("green")} style={styles.greenBtn}>
          + Green
        </button>
        <button onClick={() => addLog("red")} style={styles.redBtn}>
          + Red
        </button>
      </div>
  
      <div style={{ marginTop: "20px" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}  

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: "#1e1e1e",
    padding: "20px",
    borderRadius: "12px",
    width: "400px",
    margin: "30px auto",
    color: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "16px",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  greenBtn: {
    background: "green",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  redBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
