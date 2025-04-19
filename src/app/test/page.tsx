"use client";

import { useState } from "react";

export default function TagInput() {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [savedTags, setSavedTags] = useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      // if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      // }
      setInputValue("");
    }

    if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      const newTags = [...tags];
      newTags.pop();
      setTags(newTags);
    }
  };

  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const saveTags = () => {
    setSavedTags(tags);
    console.log("Saved Tags:", tags); // or send to backend
    alert("Tags saved!");
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-6">
      <label className="block text-gray-700 font-medium mb-2">Tags</label>

      <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg bg-white focus-within:ring-2 ring-blue-500">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
          >
            {tag}
            <button
              onClick={() => removeTag(index)}
              className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
            >
              &times;
            </button>
          </div>
        ))}

        <input
          type="text"
          className="flex-grow outline-none px-2 py-1 text-sm"
          placeholder="Type and press Enter..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <button
        onClick={saveTags}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
      >
        Save Tags
      </button>

      {savedTags.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          <strong>Saved Tags:</strong> {savedTags.join(", ")}
        </div>
      )}
    </div>
  );
}
