'use client';

import { useEffect, useState } from 'react';

type TestData = {
  id: number;
  textField: string;
  numberField: number;
  booleanField: boolean;
  dateField: string;
  createdAt: string;
};

export default function TestPage() {
  const [data, setData] = useState<TestData[]>([]);
  const [form, setForm] = useState({
    id: '',
    textField: '',
    numberField: '',
    booleanField: false,
    dateField: new Date().toISOString().slice(0, 16), // input[type="datetime-local"] format
  });
  const [counters, setCounters] = useState({
    green: 0,
    red: 0,
  });

  const fetchData = async () => {
    const res = await fetch('/api/test');
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCreateOrUpdate = async () => {
    await fetch('/api/test', {
      method: 'POST',
      body: JSON.stringify({
        textField: form.textField,
        numberField: Number(form.numberField),
        booleanField: form.booleanField,
        dateField: new Date(form.dateField).toISOString(),
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    setCounters(prev => ({ ...prev, green: prev.green + 1 }));
    fetchData();
  };

  const handleUpdate = async () => {
    if (!form.id) return;
    await fetch('/api/test', {
      method: 'PUT',
      body: JSON.stringify({
        id: Number(form.id),
        textField: form.textField,
        numberField: Number(form.numberField),
        booleanField: form.booleanField,
        dateField: new Date(form.dateField).toISOString(),
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    fetchData();
  };

  const handleDelete = async (id: number) => {
    await fetch('/api/test', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });
    setCounters(prev => ({ ...prev, red: prev.red + 1 }));
    fetchData();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Test Card</h1>
        <div className="flex justify-center gap-8">
          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-green-800 font-semibold">Green Button Presses</p>
            <p className="text-2xl font-bold text-green-600">{counters.green}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg">
            <p className="text-red-800 font-semibold">Red Button Presses</p>
            <p className="text-2xl font-bold text-red-600">{counters.red}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <input
          type="text"
          name="id"
          value={form.id}
          onChange={handleChange}
          placeholder="ID (for update only)"
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="textField"
          value={form.textField}
          onChange={handleChange}
          placeholder="Text Field (unique)"
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="numberField"
          value={form.numberField}
          onChange={handleChange}
          placeholder="Number Field"
          className="border p-2 w-full"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="booleanField"
            checked={form.booleanField}
            onChange={handleChange}
          />
          <span>Boolean Field</span>
        </label>
        <input
          type="datetime-local"
          name="dateField"
          value={form.dateField}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <div className="space-x-2 mt-4">
          <button
            onClick={handleCreateOrUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Create or Upsert
          </button>
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update by ID
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-2">📄 Records:</h2>
      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <p>
                <strong>ID:</strong> {item.id}
              </p>
              <p>
                <strong>Text:</strong> {item.textField}
              </p>
              <p>
                <strong>Number:</strong> {item.numberField}
              </p>
              <p>
                <strong>Bool:</strong> {item.booleanField ? 'true' : 'false'}
              </p>
              <p>
                <strong>Date:</strong>{' '}
                {new Date(item.dateField).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
