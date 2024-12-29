"use client";

import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeView, setActiveView] = useState('tables');

  return (
    <div className="flex h-screen">
      <main className="flex-1 overflow-auto bg-background">
        {children}
      </main>
    </div>
  );
}