'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LogIn, ShieldCheck } from 'lucide-react';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { useAuthStore } from '../store/useAuthStore';

export default function LoginPage() {
  const router = useRouter();
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoading, formErrors } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ matricula, senha });
    router.push('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <Logo />

        <form onSubmit={handleSubmit} className="form-container">
          <div className="input-group">
            <div className="input-wrapper" style={{ display: 'flex', flexDirection: 'column' }}>
              <input
                type="text"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                className="form-input"
                placeholder="Matrícula"
                disabled={isLoading}
                style={formErrors?.matricula ? { borderColor: '#ef4444' } : {}}
              />
              {formErrors?.matricula && (
                <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                  {formErrors.matricula}
                </span>
              )}
            </div>

            <div className="input-wrapper" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="form-input has-icon"
                  placeholder="Senha"
                  disabled={isLoading}
                  style={formErrors?.senha ? { borderColor: '#ef4444', width: '100%' } : { width: '100%' }}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn-toggle-password"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff size={20} strokeWidth={1.5} />
                  ) : (
                    <Eye size={20} strokeWidth={1.5} />
                  )}
                </button>
              </div>
              {formErrors?.senha && (
                <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                  {formErrors.senha}
                </span>
              )}
            </div>
          </div>

          <div className="forgot-password-container">
            <a href="#" className="forgot-password-link">
              Esqueceu sua senha?
            </a>
          </div>

          <Button
            label={isLoading ? 'Entrando...' : 'Entrar'}
            type="submit"
            disabled={isLoading}
            style={isLoading ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
            icon={!isLoading && <LogIn size={18} strokeWidth={2} />}
          />
        </form>

        <div className="footer-section">
          <div className="gov-integration">
            <ShieldCheck size={16} className="gov-integration-icon" strokeWidth={2.5} />
            <span>Integrado ao Login Único da Prefeitura</span>
          </div>
          <div className="support-text">
            Precisa de ajuda? <a href="#" className="support-link">Contate o suporte técnico</a>
          </div>
        </div>
      </div>
    </div>
  );
}
