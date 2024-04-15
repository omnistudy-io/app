export default function formatDate(date: string) {
    const dateFromString = new Date(date);
    return dateFromString.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}