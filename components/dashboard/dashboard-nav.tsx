"use client";

import { Button } from "@/components/ui/button";
import { UtensilsCrossed, BarChart, Menu, Users, Settings, Table } from "lucide-react";
import Link from "next/link";

interface DashboardNavProps {
  activeView: 'tables' | 'analytics' | 'menu' | 'employees';
  onViewChange: (view: 'tables' | 'analytics' | 'menu' | 'employees') => void;
}

export function DashboardNav({ activeView, onViewChange }: DashboardNavProps) {
  return (
    <nav className="border-b bg-card">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/dashboard" className="flex items-center gap-2">
            <UtensilsCrossed className="h-8 w-8" />
            <span className="font-bold text-xl">Patil Dhaba</span>
          </Link>

          <div className="flex items-center gap-4">
            <Button
              variant={activeView === 'tables' ? 'default' : 'ghost'}
              onClick={() => onViewChange('tables')}
            >
              <Table className="w-4 h-4 mr-2" />
              Tables
            </Button>
            <Button
              variant={activeView === 'analytics' ? 'default' : 'ghost'}
              onClick={() => onViewChange('analytics')}
            >
              <BarChart className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            <Button
              variant={activeView === 'menu' ? 'default' : 'ghost'}
              onClick={() => onViewChange('menu')}
            >
              <Menu className="w-4 h-4 mr-2" />
              Menu
            </Button>
            <Button
              variant={activeView === 'employees' ? 'default' : 'ghost'}
              onClick={() => onViewChange('employees')}
            >
              <Users className="w-4 h-4 mr-2" />
              Employees
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/dashboard/settings">
                <Settings className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}