import React, { forwardRef } from 'react';
import { ButtonHTMLAttributes } from 'react';
import { cn } from "../lib/utils"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'ghost' | 'destructive';
    size?: 'default' | 'icon';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    children,
    variant = 'default',
    size = 'default',
    ...props
}, ref) => {
    return (
        <button
            ref={ref}
            className={cn(
                "rounded-md font-semibold",
                size === 'default' && "px-4 py-2",
                size === 'icon' && "p-2",
                variant === 'default' && "bg-blue-500 text-white hover:bg-blue-600",
                variant === 'outline' && "border border-gray-300 hover:bg-gray-100",
                variant === 'ghost' && "hover:bg-gray-100",
                variant === 'destructive' && "bg-red-500 text-white hover:bg-red-600",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
});
Button.displayName = 'Button';
export default Button;
