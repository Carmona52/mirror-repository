import type {Metadata} from "next";

import "./globals.css";
import localFont from "next/font/local"

const fuenteLocal = localFont({
    src: [
        {path: './fonts/NotoSans-ExtraLight.ttf', weight: '200', style: 'normal'},
        {path: './fonts/NotoSans-Light.ttf', weight: '300', style: 'normal'},
        {path: './fonts/NotoSans-Regular.ttf', weight: '400', style: 'normal'},
        {path: './fonts/NotoSans-Medium.ttf', weight: '500', style: 'normal'},
        {path: './fonts/NotoSans-SemiBold.ttf', weight: '600', style: 'normal'},
        {path: './fonts/NotoSans-Bold.ttf', weight: '700', style: 'normal'},
        {path: './fonts/NotoSans-ExtraBold.ttf', weight: '800', style: 'normal'},
        {path: './fonts/NotoSans-Black.ttf', weight: '900', style: 'normal'},
    ],
    variable: "--font-noto-sans",
})
export const metadata: Metadata = {
    title: "Inicia Sesión para Ingresar",
    description: "Por favor, Inicia sesión para ingresar a todas las características del sistema",
};

export default function MinLayout({children,}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="es">
        <body className={`${fuenteLocal.variable} antialiased`}>
        <main>
            {children}
        </main>
        </body>
        </html>
    )
}