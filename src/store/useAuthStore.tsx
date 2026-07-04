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

    // Aqui usamos o safeParse (A melhor forma de usar Zod com TypeScript)
    const result = loginSchema.safeParse(data);

    // Se a validação falhar, tratamos o erro aqui mesmo, fora do catch
    if (!result.success) {
      const errors: Record<string, string> = {};
      
      // O TypeScript já sabe automaticamente que result.error existe aqui
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      
      set({ formErrors: errors, isLoading: false });
      return; // O return impede que o código continue e tente fazer o login
    }

    // Se chegou até aqui, result.success é true e result.data tem os dados validados
    try {
      // Simulando a requisição para o backend (ex: fetch para sua API)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log('Login efetuado com sucesso:', result.data);
      set({ isLoading: false });

    } catch (error) {
      // O catch agora fica limpo, apenas para erros do servidor (quando a API falha)
      set({ formErrors: { global: 'Erro inesperado no servidor.' }, isLoading: false });
    }
  },
}));