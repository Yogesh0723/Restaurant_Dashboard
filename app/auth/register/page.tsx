"use client";

import { RegisterForm } from '@/components/auth/register-form';

export default function RegisterPage() {
  const handleSuccess = () => {
    // Handle successful registration, e.g., redirect to login page
    console.log('Registration successful! Redirecting to login...');
    // You can use router.push('/auth/login') if using useRouter from next/router
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        <RegisterForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
}