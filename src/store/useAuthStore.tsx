// store/useAuthStore.ts
import { create } from 'zustand';
import { z } from 'zod';

// 1. Schema de validação com Zod
export const loginSchema = z.object({
  matricula: z.string().min(4, 'A matrícula deve ter no mínimo 4 caracteres.'),
  senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
});

// Tipo inferido automaticamente
export type LoginFormData = z.infer<typeof loginSchema>;

interface AuthState {
  isLoading: boolean;
  formErrors: Record<string, string> | null;
  login: (data: LoginFormData) => Promise<void>;
}

// 2. Criação do estado global
export const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,
  formErrors: null,
  
  login: async (data) => {
    set({ isLoading: true, formErrors: null });

    try {
      // O parse dispara um erro se os dados forem inválidos
      const validData = loginSchema.parse(data);

      // Simulando a requisição para o backend (ex: fetch para sua API)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log('Login efetuado com sucesso (Zod validado):', validData);
      set({ isLoading: false });

    } catch (error) {
      // Captura e formata os erros do Zod para exibir nos inputs
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0].toString()] = err.message;
          }
        });
        set({ formErrors: errors, isLoading: false });
      } else {
        set({ formErrors: { global: 'Erro inesperado.' }, isLoading: false });
      }
    }
  },
}));