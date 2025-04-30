import React, { forwardRef } from 'react';
import { cn } from "../lib/utils"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    onValueChange?: (value: string) => void;
    value?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ className, children, onValueChange, value, ...props }, ref) => {
    const [selectedValue, setSelectedValue] = React.useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        setSelectedValue(newValue);
        onValueChange?.(newValue);
    };

    React.useEffect(() => {
        setSelectedValue(value);
    }, [value]);

    return (
        <select
            ref={ref}
            className={cn(
                "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                className
            )}
            onChange={handleChange}
            value={selectedValue}
            {...props}
        >
            {children}
        </select>
    );
});
Select.displayName = 'Select';

export interface SelectTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
    required?: boolean;
}
export const SelectTrigger = forwardRef<HTMLDivElement, SelectTriggerProps>(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex items-center justify-between w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500",
            className
        )}
        {...props}
    >
        {children}
    </div>
));
SelectTrigger.displayName = 'SelectTrigger';

export interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
    placeholder?: string;
}
export const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>(({ className, children, ...props }, ref) => (
    <span ref={ref} className={cn("text-gray-500", className)} {...props}>
        {children}
    </span>
));
SelectValue.displayName = 'SelectValue';

export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("bg-white rounded-md shadow-lg border border-gray-200 mt-1", className)} {...props}>
        {children}
    </div>
));
SelectContent.displayName = 'SelectContent';

export interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}
export const SelectItem = forwardRef<HTMLOptionElement, SelectItemProps>(({ className, children, ...props }, ref) => (
    <option
        ref={ref}
        className={cn(
            "px-4 py-2 hover:bg-gray-100 cursor-pointer",
            className
        )}
        {...props}
    >
        {children}
    </option>
));
SelectItem.displayName = 'SelectItem';