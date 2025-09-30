export function formatText(text: string): string {
    if (!text) return "";

    // stap 1: rare control characters eruit
    const cleaned = text
        .replace(/\f/g, " ")
        .replace(/\u00ad/g, "")
        .replace(/\s+/g, " ")
        .trim();

    // stap 2: alles lowercase
    const lower = cleaned.toLowerCase();

    // stap 3: eerste letter uppercase
    return lower.charAt(0).toUpperCase() + lower.slice(1);
}
