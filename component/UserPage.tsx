"use client";

import { useState } from "react";

import CardManager from "@/app/habits/page";

type Question = {
  question: string;
  options: { label: string; value: string }[];
  trait: string; 
};

const questions: Question[] = [
  {
    question: "You're at a party. You:",
    options: [
      { label: "Mingle with everyone, talk a lot", value: "E" },
      { label: "Stick with a few people or leave early", value: "I" },
    ],
    trait: "EI",
  },
  {
    question: "When learning something new, you prefer:",
    options: [
      { label: "Facts and hands-on examples", value: "S" },
      { label: "Ideas and patterns", value: "N" },
    ],
    trait: "SN",
  },
  {
    question: "You make decisions more based on:",
    options: [
      { label: "Logic and fairness", value: "T" },
      { label: "Feelings and people", value: "F" },
    ],
    trait: "TF",
  },
  {
    question: "You like to:",
    options: [
      { label: "Plan everything", value: "J" },
      { label: "Be spontaneous", value: "P" },
    ],
    trait: "JP",
  },
];

export default function MbtiQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
   
      const traits = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
      newAnswers.forEach((val) => (traits[val as keyof typeof traits] += 1));

      const type =
        (traits.E >= traits.I ? "E" : "I") +
        (traits.S >= traits.N ? "S" : "N") +
        (traits.T >= traits.F ? "T" : "F") +
        (traits.J >= traits.P ? "J" : "P");

      setResult(type);
      localStorage.setItem("mbtiType", type);
      localStorage.setItem("mbtiAnswers", JSON.stringify(newAnswers));
    }
  };

  if (result) {
    return (
      <CardManager />
    );
  }

  const current = questions[step];

  return (
    <div className="w-full mx-auto bg-gray-800 p-6  shadow-lg">
      <h2 className="text-xl font-semibold text-sky-800 mb-4">
        Question {step + 1} of {questions.length}
      </h2>
      <p className="text-sky-700 mb-6">{current.question}</p>

      <div className="space-y-4">
        {current.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(option.value)}
            className="block w-full text-left bg-sky-50 hover:bg-sky-100 border border-sky-300 px-4 py-3 rounded-lg text-sky-800 transition"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
