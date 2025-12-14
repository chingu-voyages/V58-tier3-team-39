type Button1Props = {
  variant?: 'primary' | 'secondary';
  active?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

const Button1 = ({
  variant = 'primary',
  onClick,
  children,
  disabled = false,
  className = '',
  ...props
}: Button1Props) => {
  const base =
    'font-bold rounded-lg transition-all duration-200 px-3 py-2  text-sm md:px-6 md:py-2.5 md:text-base lg:px-8 lg:py-4 lg:text-xl';
  const variants = {
    primary: 'bg-[#4D77FF] text-white hover:bg-[#456be5]',
    secondary:
      'border border-blue-brand text-blue-brand hover:bg-blue-brand/20',
  };

  const disabledClass = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';

  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${disabledClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button1;
