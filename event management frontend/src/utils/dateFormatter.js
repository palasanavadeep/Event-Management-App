export function convertToISO(dateStr) {
    return dateStr + "T10:00:00";
}

export function convertToDate(dateTimeStr) {
    return dateTimeStr.split("T")[0];
}
export function convertToTime(dateTimeStr) {
    return dateTimeStr.split("T")[1].split(":").slice(0, 2).join(":");
}