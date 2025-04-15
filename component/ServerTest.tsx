'use client';

import { useState } from 'react';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/create-post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    const data = await res.json();
    alert('Post created!');
    console.log(data);

    setTitle('');
    setContent('');
    setLoading(false);
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Create a Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Post'}
        </button>
      </form>
    </main>
  );
}
