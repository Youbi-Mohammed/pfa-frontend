import React, { forwardRef } from 'react';
import { cn } from "../lib/utils"
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
    <textarea
        ref={ref}
        className={cn(
            "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-h-[100px]",
            className
        )}
        {...props}
    />
));
Textarea.displayName = 'Textarea';
export default Textarea;