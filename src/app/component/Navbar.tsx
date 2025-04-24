"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUserName(data[0].name);
    };

    fetchUsers();
  }, []);

  return (
    <nav className="w-full bg-blue-600/80 backdrop-blur-md shadow-lg text-white fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Welcome */}
        <div className="text-xl font-semibold tracking-wide hover:underline transition-all">
          <Link href="/">
            {userName ? `Welcome, ${userName}` : "Welcome"}
          </Link>
        </div>

        {/* Right: Navigation Links */}
        <ul className="flex gap-6 text-sm font-medium">
          <li>
            <Link
              href="/"
              className="hover:text-yellow-600 transition-colors duration-300 text-2xl font-bold"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/hhabits"
                className="hover:text-yellow-600 transition-colors duration-300 text-2xl font-bold"
            >
              Habits
            </Link>
          </li>
          <li className="">
            <Link
              href="/events"
              className="hover:text-yellow-600 transition-colors duration-300 text-2xl font-bold" >
              Events
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
