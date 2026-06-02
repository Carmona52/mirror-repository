import * as React from "react"
import {cva, type VariantProps} from "class-variance-authority"
import {cn} from "@/lib/utils"

const cardVariants = cva(
    "transition duration-300 ease-in-out",
    {
        variants: {
            variant: {
                default: "card-glass hover:border-primary/40 w-90" ,
                full: "flex flex-row items-center shadow-lg w-full border border-primary/20 hover:border-primary/50 bg-background text-foreground",
                flat: "flex flex-col shadow-none bg-secondary/20 border-transparent",
                interactive: "flex flex-col hover:bg-secondary/10 transition-colors cursor-pointer",
            }
        },
        defaultVariants: {variant: "default"}
    }
)

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({className, variant, ...props}, ref) => (
        <div className={cn(cardVariants({variant, className}))} ref={ref} {...props} />
    )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({className, ...props}, ref) => (
        <div
            className={cn("w-full overflow-hidden rounded-t-xl", className)}
            ref={ref}
            {...props}
        />
    )
)
CardHeader.displayName = "CardHeader"

const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({className, ...props}, ref) => (
        <div className={cn("flex flex-col gap-1 px-4 py-3", className)} ref={ref} {...props} />
    )
)
CardBody.displayName = "CardBody"

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({className, ...props}, ref) => (
        <h3
            className={cn("text-base font-semibold leading-snug tracking-tight", className)}
            ref={ref}
            {...props}
        />
    )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({className, ...props}, ref) => (
        <p
            className={cn("text-sm text-muted-foreground line-clamp-2", className)}
            ref={ref}
            {...props}
        />
    )
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({className, ...props}, ref) => (
        <div className={cn("px-4 pb-3 flex flex-col gap-2", className)} ref={ref} {...props} />
    )
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({className, ...props}, ref) => (
        <div
            className={cn("px-4 pb-4 pt-1 flex items-center gap-2 mt-auto", className)}
            ref={ref}
            {...props}
        />
    )
)
CardFooter.displayName = "CardFooter"

export {Card, CardHeader, CardBody, CardFooter, CardTitle, CardDescription, CardContent, cardVariants}