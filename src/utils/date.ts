export function formatSinceDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  let formattedDate = date.toLocaleDateString("pt-BR", options);

  formattedDate = formattedDate.replace(/ de \d{4}$/, "");

  return `Por aqui desde ${formattedDate}, de ${date.getFullYear()}`;
}
