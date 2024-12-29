"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Pencil, Trash2, Calendar, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Employee {
  _id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  salary: number;
  joiningDate: string;
}

export function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    role: 'waiter',
    phone: '',
    email: '',
    salary: '',
    joiningDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/employees');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch employees",
        variant: "destructive",
      });
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editEmployee ? `/api/employees/${editEmployee._id}` : '/api/employees';
      const method = editEmployee ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Operation failed');

      toast({
        title: "Success",
        description: `Employee ${editEmployee ? 'updated' : 'added'} successfully`,
      });
      
      setFormData({
        name: '',
        role: 'waiter',
        phone: '',
        email: '',
        salary: '',
        joiningDate: new Date().toISOString().split('T')[0],
      });
      setEditEmployee(null);
      setShowForm(false);
      fetchEmployees();
    } catch (error) {
      toast({
        title: "Error",
        description: "Operation failed",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/employees/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Delete failed');

      toast({
        title: "Success",
        description: "Employee deleted successfully",
      });
      fetchEmployees();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete employee",
        variant: "destructive",
      });
    }
  };

  const markAttendance = async (employeeId: string, status: string) => {
    try {
      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeId,
          date: new Date().toISOString(),
          status,
        }),
      });

      if (!res.ok) throw new Error('Failed to mark attendance');

      toast({
        title: "Success",
        description: "Attendance marked successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark attendance",
        variant: "destructive",
      });
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Employee Management</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Employee'}
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {showForm && (
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <select
              className="w-full p-2 border rounded"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="waiter">Waiter</option>
              <option value="chef">Chef</option>
              <option value="manager">Manager</option>
              <option value="cashier">Cashier</option>
            </select>
            <Input
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              type="number"
              placeholder="Salary"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              required
            />
            <Input
              type="date"
              value={formData.joiningDate}
              onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
              required
            />
            <Button type="submit">{editEmployee ? 'Update' : 'Add'} Employee</Button>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.map((employee) => (
          <Card 
            key={employee._id} 
            className="p-4 relative group hover:shadow-lg transition-shadow"
          >
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditEmployee(employee);
                  setShowForm(true);
                  setFormData({
                    name: employee.name,
                    role: employee.role,
                    phone: employee.phone,
                    email: employee.email,
                    salary: employee.salary.toString(),
                    joiningDate: new Date(employee.joiningDate).toISOString().split('T')[0],
                  });
                }}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(employee._id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const status = window.prompt('Enter attendance status (present/absent/half-day/leave):');
                  if (status && ['present', 'absent', 'half-day', 'leave'].includes(status)) {
                    markAttendance(employee._id, status);
                  }
                }}
              >
                <Calendar className="w-4 h-4" />
              </Button>
            </div>
            <h3 className="font-bold">{employee.name}</h3>
            <p className="text-sm text-muted-foreground capitalize">{employee.role}</p>
            <p className="text-sm">{employee.phone}</p>
            <p className="text-sm">{employee.email}</p>
            <p className="font-bold mt-2">₹{employee.salary}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}