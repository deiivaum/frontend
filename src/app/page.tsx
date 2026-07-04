// src/app/login/page.tsx
import FormLogin from "../app/login";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md border border-gray-100">
        <div className="text-center mb-6">
        </div>
        
        {/* Aqui chamamos o componente de formulário */}
        <FormLogin />
      </div>
    </main>
  );
}