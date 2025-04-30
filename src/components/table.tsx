import React, { forwardRef } from 'react';
import { cn } from "../lib/utils"

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}
export const Table = forwardRef<HTMLTableElement, TableProps>(({ className, children, ...props }, ref) => (
    <table ref={ref} className={cn("w-full", className)} {...props}>
        {children}
    </table>
));
Table.displayName = 'Table';

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}
export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(({ className, children, ...props }, ref) => (
    <thead ref={ref} className={cn("", className)} {...props}>
        {children}
    </thead>
));
TableHeader.displayName = 'TableHeader';

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}
export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(({ className, children, ...props }, ref) => (
    <tbody ref={ref} className={cn("", className)} {...props}>
        {children}
    </tbody>
));
TableBody.displayName = 'TableBody';

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(({ className, children, ...props }, ref) => (
    <tr ref={ref} className={cn("", className)} {...props}>
        {children}
    </tr>
));
TableRow.displayName = 'TableRow';

export interface TableHeadProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}
export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(({ className, children, ...props }, ref) => (
    <th
        ref={ref}
        className={cn(
            "px-4 py-2 text-left font-semibold",
            className
        )}
        {...props}
    >
        {children}
    </th>
));
TableHead.displayName = 'TableHead';

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(({ className, children, ...props }, ref) => (
    <td ref={ref} className={cn("px-4 py-2", className)} {...props}>
        {children}
    </td>
));
TableCell.displayName = 'TableCell';
