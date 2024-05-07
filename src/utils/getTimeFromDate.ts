export default function getTimeFromDate(date: string) {
    const dateObj = addHours(new Date(date), 5);
    return dateObj.toLocaleTimeString().replace(":00", "");
}

function addHours(date: Date, hours: number) {
    return new Date(date.getTime() + hours * 60 * 60 * 1000);
}