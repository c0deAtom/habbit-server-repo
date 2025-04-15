'use client';

import { useState } from 'react';
import { prisma } from '../lib/prisma'; // This will be used in server action

export async function saveToDB(formData: FormData) {


  const text = formData.get('text')?.toString();
  if (text) {
    await prisma.message.create({ data: { text } });
  }
}

export default function Home() {
  const [text, setText] = useState('');

  return (
    <form action={saveToDB} className="p-4">
      <input
        name="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something"
        className="border p-2 rounded"
      />
      <button type="submit" className="ml-2 bg-blue-600 text-white px-3 py-1 rounded">
        Save
      </button>
    </form>
  );
}
