import * as React from "react";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
    {
        variants: {
            variant: {
                default: 'glass border border-glass-border-subtle shadow-glass hover:bg-white/20 dark:hover:bg-white/10 ',
                primary: 'glass-strong bg-primary/80 text-primary-foreground border border-primary/30 shadow-glass-lg hover:bg-primary/90',
                secondary: 'glass bg-secondary/70 text-secondary-foreground border border-glass-border-subtle shadow-glass hover:bg-secondary/80',
                destroy: 'glass bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 hover:text-red-600 hover:shadow-glass',
                kevinespecial: 'animate-rainbow bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 text-white font-bold text-base shadow-md',
                sidebar: 'glass bg-transparent text-foreground hover:glass-strong hover:text-accent-foreground rounded-lg border border-glass-border-subtle hover:border-glass-border shadow-sm hover:shadow-glass transition duration-150 ease-in-out text-2xl',
            },
            size: {
                default: 'h-10 px-4 py-2',
                xs: 'h-8 p-2 rounded-sm',
                sm: 'h-9 p-2 rounded-md',
                lg: 'h-11 py-2 px-5',
                xl: 'h-12 py-2 px-8',
                sidebar: 'h-14 px-4 py-3 text-base'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({className, variant, size, icon, iconPosition = "left", children, ...props}, ref) => {
        return (
            <button className={cn(buttonVariants({variant, size, className}))} ref={ref} {...props}>
                {icon && iconPosition === "left" && icon}
                {children}
                {icon && iconPosition === "right" && icon}
            </button>
        )
    }
)

Button.displayName = "Button"

export {Button, buttonVariants}