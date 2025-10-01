export function formatText(text: string): string {
    if (!text) return "";

    const cleaned = text
        .replace(/\f/g, " ")
        .replace(/\u00ad/g, "")
        .replace(/\s+/g, " ")
        .trim();

    const lower = cleaned.toLowerCase();

    return lower.charAt(0).toUpperCase() + lower.slice(1);
}
