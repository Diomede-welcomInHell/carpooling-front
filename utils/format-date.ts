export function formatDate(datetime: string): string {
    return new Date(datetime).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export function formatTime(datetime: string): string {
    return new Date(datetime).toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
    });
}