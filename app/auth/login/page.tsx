"use client";

import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  const handleSuccess = () => {
    // Handle successful registration, e.g., redirect to login page
    console.log('Login successful! Redirecting to dashboard...');
    // You can use router.push('/auth/login') if using useRouter from next/router
  };

return (
 <div className="min-h-screen flex items-center justify-center bg-gray-50">
   <div className="w-full max-w-md p-8">
     <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
     <LoginForm onSuccess={handleSuccess} />
   </div>
 </div>
);
}