import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "../globals.css";

export const metadata: Metadata = {
    title: "Inicia Sesión para Ingresar",
    description: "Por favor, Inicia sesión para ingresar a todas las características del sistema",
};

export default function MinLayout({children,}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            {children}
        </div>

    )
}