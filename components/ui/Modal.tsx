"use client"

import * as React from "react"
import {createPortal} from "react-dom"
import {X} from "lucide-react"
import {cn} from "@/lib/utils"


type ModalContextType = {
    isOpen: boolean
    openModal: () => void
    closeModal: () => void
}

const ModalContext = React.createContext<ModalContextType | null>(null)

const useModal = () => {
    const context = React.useContext(ModalContext)
    if (!context) throw new Error("Los componentes del modal deben usarse dentro de <Modal>")
    return context
}

const Modal = ({children, open, onOpenChange}: {
    children: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
}) => {
    const [internalOpen, setInternalOpen] = React.useState(false)

    const isControlled = open !== undefined
    const isOpen = isControlled ? open : internalOpen

    const openModal = React.useCallback(() => {
        if (!isControlled) setInternalOpen(true)
        onOpenChange?.(true)
    }, [isControlled, onOpenChange])

    const closeModal = React.useCallback(() => {
        if (!isControlled) setInternalOpen(false)
        onOpenChange?.(false)
    }, [isControlled, onOpenChange])

    return (
        <ModalContext.Provider value={{isOpen, openModal, closeModal}}>
            {children}
        </ModalContext.Provider>
    )
}

const ModalTrigger = ({children, asChild}: {
    children: React.ReactNode
    asChild?: boolean
}) => {
    const {openModal} = useModal()

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
            onClick: (e: React.MouseEvent) => {
                openModal()
                const original = (children as React.ReactElement<React.HTMLAttributes<HTMLElement>>).props.onClick
                if (typeof original === 'function') original(e as React.MouseEvent<HTMLButtonElement>)
            }
        })
    }

    return (
        <button onClick={openModal} type="button">
            {children}
        </button>
    )
}

const ModalClose = ({children, asChild}: {
    children: React.ReactNode
    asChild?: boolean
}) => {
    const {closeModal} = useModal()

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
            onClick: (e: React.MouseEvent) => {
                closeModal()
                const original = (children as React.ReactElement<React.HTMLAttributes<HTMLElement>>).props.onClick
                if (typeof original === 'function') original(e as React.MouseEvent<HTMLButtonElement>)
            }
        })
    }

    return (
        <button onClick={closeModal} type="button">
            {children}
        </button>
    )
}

function useIsClient(): boolean {
    return React.useSyncExternalStore(
        (cb) => {
            window.addEventListener("_noop_", cb)
            return () => window.removeEventListener("_noop_", cb)
        },
        () => true,
        () => false
    )
}

type Phase = "hidden" | "entering" | "visible" | "leaving"

const ModalContent = ({className, children}: {
    className?: string
    children: React.ReactNode
}) => {
    const {isOpen, closeModal} = useModal()
    const isClient = useIsClient()
    const [phase, setPhase] = React.useState<Phase>("hidden")

    React.useEffect(() => {
        if (isOpen) {
            let rafId2 = -1
            const rafId1 = requestAnimationFrame(() => {
                setPhase("entering")
                rafId2 = requestAnimationFrame(() => setPhase("visible"))
            })
            return () => {
                cancelAnimationFrame(rafId1)
                cancelAnimationFrame(rafId2)
            }
        }
        const t1 = setTimeout(() => setPhase("leaving"), 0)
        const t2 = setTimeout(() => setPhase("hidden"), 200)
        return () => {
            clearTimeout(t1)
            clearTimeout(t2)
        }
    }, [isOpen])

    React.useEffect(() => {
        if (!isOpen) return

        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal()
        }
        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.body.style.overflow = originalOverflow
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isOpen, closeModal])

    if (!isClient || phase === "hidden") return null

    const isAnimating = phase === "visible"

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                onClick={closeModal}
                className={cn(
                    "fixed inset-0 bg-black/10 backdrop-blur-xs transition-opacity duration-200",
                    isAnimating ? "opacity-100" : "opacity-0"
                )}
            />


            <div
                role="dialog"
                aria-modal="true"
                className={cn(
                    "relative z-50 w-full max-w-lg rounded-md modal-glass transition-all duration-200 p-5",
                    isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95",
                    className
                )}
            >
                <button
                    onClick={closeModal}
                    type="button"
                    className="absolute right-4 top-4 rounded-md p-1 opacity-60 hover:opacity-100 hover:bg-accent transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Cerrar modal"
                >
                    <X className="h-5 w-5"/>
                </button>
                {children}
            </div>
        </div>,
        document.body
    )
}

const ModalHeader = ({className, ...props}: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("flex flex-col space-y-1.5 mb-4", className)} {...props} />
)
ModalHeader.displayName = "ModalHeader"

const ModalFooter = ({className, ...props}: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("flex flex-row justify-end gap-2 mt-6", className)} {...props} />
)
ModalFooter.displayName = "ModalFooter"

const ModalTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({className, ...props}, ref) => (
        <h3 ref={ref} className={cn("text-xl font-bold leading-none tracking-tight pr-6", className)} {...props} />
    )
)
ModalTitle.displayName = "ModalTitle"

const ModalDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({className, ...props}, ref) => (
        <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
    )
)
ModalDescription.displayName = "ModalDescription"


export {
    Modal,
    ModalTrigger,
    ModalClose,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalTitle,
    ModalDescription,
    useModal,
}