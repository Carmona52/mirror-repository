export function toSpanish(text: string) {
    const translations: Record<string, string> = {
        pending: "Pendiente",
        confirmed: "Confirmado",
        preparing: "En Preparación",
        shipped: "Enviado",
        delivered: "Entregado",
        cancelled: "Cancelado"
    };
    return translations[text] || text;
}