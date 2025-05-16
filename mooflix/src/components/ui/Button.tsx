import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, className, ...attr }: Props) {
  return (
    <button
      className={`font-bold hover:text-[var(--text-secondary)] hover:cursor-pointer ${className}`}
      {...attr}
    >
      {children}
    </button>
  );
}

export default Button;
