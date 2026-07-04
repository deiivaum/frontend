import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: React.ReactNode;
}

export default function Button({ label, icon, ...props }: ButtonProps) {
  return (
    <button {...props} className="btn-primary">
      <span>{label}</span>
      {icon && <span className="btn-icon">{icon}</span>}
    </button>
  );
}
