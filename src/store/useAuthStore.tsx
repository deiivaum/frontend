import { create } from 'zustand';
import { z } from 'zod';

export const loginSchema = z.object({
  matricula: z.string().min(4, 'A matrícula deve ter no mínimo 4 caracteres.'),
  senha: z.string(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
type FormErrors = Partial<Record<keyof LoginFormData | 'global', string>>;

interface AuthState {
  isLoading: boolean;
  formErrors: FormErrors;
  login: (data: LoginFormData) => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  isLoading: false,
  formErrors: {},

  login: async (data) => {
    set({ isLoading: true, formErrors: {} });

    try {
      const result = loginSchema.safeParse(data);

      if (!result.success) {
        const errors: FormErrors = {};

        result.error.issues.forEach((issue) => {
          const field = issue.path[0];

          if (typeof field === 'string') {
            errors[field as keyof LoginFormData] = issue.message;
          }
        });

        set({ formErrors: errors, isLoading: false });
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Login efetuado com sucesso (Zod validado):', result.data);
      set({ isLoading: false });
    } catch (error) {
      if (error instanceof Error) {
        set({ formErrors: { global: error.message }, isLoading: false });
      } else {
        set({ formErrors: { global: 'Erro inesperado.' }, isLoading: false });
      }
    }
  },
}));
