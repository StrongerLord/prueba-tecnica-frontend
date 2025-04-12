export const formatDate = (dateISO: string | Date): string => {
  if (dateISO) {
    const date = new Date(dateISO);
    return date
      .toLocaleTimeString("es-MX", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(/\./g, "");
  }
  return ""; // Return an empty string if dateISO is undefined
};
