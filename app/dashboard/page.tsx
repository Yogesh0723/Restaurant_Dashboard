// project/app/dashboard/page.tsx
"use client";

import { useState } from 'react';
import { DashboardNav } from '@/components/dashboard/dashboard-nav';
import { Sidebar } from '@/components/dashboard/sidebar'; // Import Sidebar
import { TableManagement } from '@/components/dashboard/table-management';
import { Analytics } from '@/components/dashboard/analytics';
import { EmployeeManagement } from '@/components/dashboard/employee-management';
import { MenuManagement } from '@/components/dashboard/menu-management';

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<'tables' | 'analytics' | 'menu' | 'employees'>('tables');

  const renderView = () => {
    switch (activeView) {
      case 'tables':
        return <TableManagement />;
      case 'analytics':
        return <Analytics />;
      case 'menu':
        return <MenuManagement />;
      case 'employees':
        return <EmployeeManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activeView={activeView} onViewChange={setActiveView} /> {/* Pass props to Sidebar */}
      <div className="flex-1">
        <DashboardNav activeView={activeView} onViewChange={setActiveView} />
        <main className="p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
}