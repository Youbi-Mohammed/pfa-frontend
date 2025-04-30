import React, { forwardRef } from 'react';
import { cn } from "../lib/utils"
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}
const Label = forwardRef<HTMLLabelElement, LabelProps>(({ className, children, ...props }, ref) => (
    <label ref={ref} className={cn("block text-sm font-medium text-gray-700", className)} {...props}>
        {children}
    </label>
));
Label.displayName = 'Label';
export default Label;