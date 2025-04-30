import React, { forwardRef } from 'react';
import { cn } from "../lib/utils"

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'destructive';
}
export const Alert = forwardRef<HTMLDivElement, AlertProps>(({ className, children, variant = 'default', ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-md border p-4",
            variant === 'destructive' && "bg-red-100 text-red-800 border-red-300",
            className
        )}
        {...props}
    >
        {children}
    </div>
));
Alert.displayName = 'Alert';

export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
export const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(({ className, children, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-lg font-semibold", className)} {...props}>
        {children}
    </h3>
));
AlertTitle.displayName = 'AlertTitle';

export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
export const AlertDescription = forwardRef<HTMLParagraphElement, AlertDescriptionProps>(({ className, children, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm", className)} {...props}>
        {children}
    </p>
));
AlertDescription.displayName = 'AlertDescription';