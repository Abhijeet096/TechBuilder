import React from 'react';

export default function Button({ variant = 'primary', className = '', children, ...props }) {
  const base = 'btn ' + (variant === 'primary' ? 'btn-primary' : 'btn-secondary');
  return (
    <button className={`${base} ${className}`} {...props}>
      {children}
    </button>
  );
}
