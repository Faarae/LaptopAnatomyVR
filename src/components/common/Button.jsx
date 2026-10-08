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
    // Primary: Emerald background, white text, darker emerald on hover
    primary: `
      bg-emerald-500 text-white border border-emerald-500 font-bold shadow-xs
      hover:bg-emerald-600 hover:border-emerald-600 hover:shadow-md
      active:scale-[0.98] active:bg-emerald-700
      disabled:bg-emerald-200 disabled:border-transparent disabled:text-white/70 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none
    `,
    // Secondary: Crisp white surface, subtle slate border, hover emerald highlight
    secondary: `
      bg-white text-slate-800 border border-slate-200/90 shadow-xs
      hover:bg-slate-50 hover:border-emerald-500 hover:text-emerald-700 hover:shadow-sm
      active:scale-[0.98] active:bg-slate-100
      disabled:opacity-40 disabled:border-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none
    `,
    // Outline: Clean outline with emerald hover
    outline: `
      bg-transparent text-slate-700 border border-slate-300
      hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50/50
      active:scale-[0.98] active:bg-emerald-100/50
      disabled:opacity-40 disabled:border-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed disabled:transform-none
    `,
    // Ghost / Tertiary: Transparent, neutral slate text
    ghost: `
      bg-transparent text-slate-600 border border-transparent
      hover:text-slate-900 hover:bg-slate-100
      active:scale-[0.98]
      disabled:opacity-40 disabled:text-slate-300 disabled:cursor-not-allowed disabled:transform-none
    `,
    // Danger: Semantic Error Red
    danger: `
      bg-rose-500 text-white border border-rose-500
      hover:bg-rose-600 hover:shadow-md
      active:scale-[0.98]
      disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none
    `,
    // Warning: Accent Amber
    warning: `
      bg-amber-500 text-white border border-amber-500 font-bold
      hover:bg-amber-600 hover:shadow-md
      active:scale-[0.98]
      disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none
    `,
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={`
        relative inline-flex items-center justify-center rounded-xl transition-all duration-200 uppercase font-display select-none
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
