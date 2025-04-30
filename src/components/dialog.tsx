import React, { forwardRef } from 'react';
import { cn } from "../lib/utils"

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(({ open, onOpenChange, className, children, ...props }, ref) => {
  if (!open) return null;
    return (
        <div ref={ref} className={cn("fixed inset-0 z-50", className)} {...props}>
            <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {children}
            </div>
        </div>
    );
});
Dialog.displayName = 'Dialog';

export interface DialogTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
    asChild?: boolean;
}
export const DialogTrigger = forwardRef<HTMLDivElement, DialogTriggerProps>(({ className, children, asChild = false, ...props }, ref) => {
    if (asChild) {
      return <>{children}</>;
    }
    return (
        <div ref={ref} className={cn("", className)} {...props}>
            {children}
        </div>
    );
});
DialogTrigger.displayName = 'DialogTrigger';

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "bg-white rounded-md shadow-lg p-4",
            className
        )}
        {...props}
    >
        {children}
    </div>
));
DialogContent.displayName = 'DialogContent';

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props}>
        {children}
    </div>
));
DialogHeader.displayName = 'DialogHeader';

export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(({ className, children, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-lg font-semibold", className)} {...props}>
        {children}
    </h2>
));
DialogTitle.displayName = 'DialogTitle';

export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
export const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(({ className, children, ...props }, ref) => (
    <p ref={ref} className={cn("text-gray-500", className)} {...props}>
        {children}
    </p>
));
DialogDescription.displayName = 'DialogDescription';

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex justify-end gap-2 mt-4", className)} {...props}>
        {children}
    </div>
));
DialogFooter.displayName = 'DialogFooter';
