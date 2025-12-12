type ButtonProps = {
  variant?: 'primary' | 'secondary';
  active?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
};

const Button = ({
  variant = 'primary',
  onClick,
  children,
  disabled = false,
  ...props
}: ButtonProps) => {
  const base =
    'font-bold rounded-lg transition-all duration-200 px-3 py-2  text-sm md:px-6 md:py-2.5 md:text-base lg:px-6 lg:py-3 lg:text-xl';
  const variants = {
    primary: 'bg-[#4D77FF] text-white  hover:bg-[#456be5]',
    secondary:
      'border border-[#4D77FF] text-[#4D77FF] hover:bg-[#4D77FF]/20',
  };

  const disabledClass = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';

  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${disabledClass}`}
    >
      {children}
    </button>
  );
};

export default Button;
