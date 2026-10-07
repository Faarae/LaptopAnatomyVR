import React from 'react';

/**
 * Standardized Cyberpunk/Futuristic Button
 * Implements strict states: Default, Hover, Active, Disabled
 */
export default function Button({
  children,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost'
  size = 'md',        // 'sm' | 'md' | 'lg'
  disabled = false,
  className = '',
  icon: Icon,
  iconPosition = 'right',
  type = 'button',
  ...props
}) {
  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs font-medium tracking-wider gap-1.5',
    md: 'px-5 py-2.5 text-sm font-semibold tracking-wider gap-2',
    lg: 'px-7 py-3.5 text-base font-bold tracking-wider gap-3',
  };

  const variantStyles = {
    // Primary: Cyan accent with glow
    primary: `
      bg-[#38BDF8] text-[#0B1020] border border-[#38BDF8]
      hover:bg-[#7dd3fc] hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:border-[#7dd3fc]
      active:scale-[0.98] active:bg-[#0284c7]
      disabled:bg-[#38BDF8]/40 disabled:border-transparent disabled:text-[#0B1020]/60 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none
    `,
    // Secondary: Indigo/purple futuristic
    secondary: `
      bg-[#818CF8] text-[#0B1020] border border-[#818CF8]
      hover:bg-[#a5b4fc] hover:shadow-[0_0_20px_rgba(129,140,248,0.5)] hover:border-[#a5b4fc]
      active:scale-[0.98] active:bg-[#6366f1]
      disabled:bg-[#818CF8]/40 disabled:border-transparent disabled:text-[#0B1020]/60 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none
    `,
    // Outline: Glass cyber outline
    outline: `
      bg-[#172033]/80 backdrop-blur-md text-[#F8FAFC] border border-[#38BDF8]/30
      hover:border-[#38BDF8] hover:text-[#38BDF8] hover:bg-[#172033] hover:shadow-[0_0_15px_rgba(56,189,248,0.25)]
      active:scale-[0.98] active:bg-[#111827]
      disabled:opacity-40 disabled:border-slate-700 disabled:text-slate-500 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none
    `,
    // Ghost: Subtle navigation button
    ghost: `
      bg-transparent text-[#94A3B8] border border-transparent
      hover:text-[#F8FAFC] hover:bg-[#172033]/60
      active:scale-[0.98]
      disabled:opacity-40 disabled:text-slate-600 disabled:cursor-not-allowed disabled:transform-none
    `
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={`
        relative inline-flex items-center justify-center rounded-lg transition-all duration-200 uppercase font-display select-none
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />}
    </button>
  );
}
