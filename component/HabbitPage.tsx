"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Question = {
  key: string;
  text: string;
  type: "text" | "choice";
};

const questions: Question[] = [
  { key: "name", text: "What's your name?", type: "text" },
  { key: "about", text: "Tell us a little about yourself.", type: "text" },
  { key: "q1", text: "You enjoy vibrant social events with lots of people.", type: "choice" },
  { key: "q2", text: "You often spend time exploring unrealistic yet intriguing ideas.", type: "choice" },
  { key: "q3", text: "Logic is usually more important than feelings when making decisions.", type: "choice" },
  { key: "q4", text: "You usually prefer to follow a schedule.", type: "choice" },


];



export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [userData, setUserData] = useState<Record<string, string>>({});
  const router = useRouter();





  
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("userData") || "{}");
    const firstUnansweredIndex = questions.findIndex((q) => !savedData[q.key]);

    if (firstUnansweredIndex === -1) {
  
      router.push("/habits");
    } else {
  
      setUserData(savedData);
      setCurrentIndex(firstUnansweredIndex);
    }
  }, []);

  useEffect(() => {
    const currentQuestion = questions[currentIndex];
    let i = 0;
    setTypedText("");
    setShowInput(false);

    const interval = setInterval(() => {
      if (i <= currentQuestion.text.length ) {
        setTypedText(currentQuestion.text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowInput(true), 300);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [currentIndex]);










  




  const handleSubmit = (value: string) => {
    const key = questions[currentIndex].key;
    const updatedData = { ...userData, [key]: value };
    setUserData(updatedData);
    localStorage.setItem("userData", JSON.stringify(updatedData));
    setInputValue("");

    if (currentIndex === questions.length - 1) {
      router.push("/habits");
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const current = questions[currentIndex];

  return (
<>
    
    <div className="h-screen w-screen bg-black text-white flex  justify-center text-center px-4">
      <div></div>
      <div>
        <h1 className="text-2xl sm:text-3xl font-mono whitespace-pre-wrap mb-4 pt-60">{typedText}|</h1>

        {showInput && current.type === "text" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (inputValue.trim()) handleSubmit(inputValue.trim());
            }}
          >
            <input
              className="bg-gray-800 px-4 py-2 rounded text-white border border-gray-600 focus:outline-none"
              placeholder="Type here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
            />
          </form>
        )}

        {showInput && current.type === "choice" && (
          <div className="flex justify-center gap-6 mt-4">
            <button
              className="bg-green-600 px-6 py-2 rounded hover:bg-green-700"
              onClick={() => handleSubmit("Agree")}
            >
              Agree
            </button>
            <button
              className="bg-red-600 px-6 py-2 rounded hover:bg-red-700"
              onClick={() => handleSubmit("Disagree")}
            >
              Disagree
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
