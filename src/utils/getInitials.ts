export default function getInitials(name: string): string {
    if(name === "")
        return "";

    const names = name.split(" ");
    let initials = "";
    names.forEach((n) => {
        initials += n[0];
    });
    return initials;
}