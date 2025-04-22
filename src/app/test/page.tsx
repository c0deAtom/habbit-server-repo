"use client"

import { useState } from 'react';

export default function EditableTitle() {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('My Habit Title');
  const [newTitle, setNewTitle] = useState(title);

  const handleSave = () => {
    setTitle(newTitle);
    setIsEditing(false);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      {isEditing ? (
        <div>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ fontSize: '1.5rem' }}
          />
          <button onClick={handleSave}>💾</button>
          <button onClick={() => setIsEditing(false)}>❌</button>
        </div>
      ) : (
        <div>
          <h3 style={{ display: 'inline-block', marginRight: '10px' }}>{title}</h3>
          <button onClick={() => setIsEditing(true)}>✏️</button>
        </div>
      )}
    </div>
  );
}
