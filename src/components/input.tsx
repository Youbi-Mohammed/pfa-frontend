import React, { forwardRef } from 'react';
import { cn } from "../lib/utils"
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const Input = forwardRef<HTMLInputElement, InputProps>(({
    className,
    ...props
}, ref) => {
    return (
        <input
            ref={ref}
            className={cn(
                "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                className
            )}
            {...props}
        />
    );
});
Input.displayName = 'Input';
export default Input;