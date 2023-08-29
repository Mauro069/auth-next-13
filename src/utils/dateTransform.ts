export function dateTransform(date: string): string {
  const formattedDate = date.split("T")[0];

  return `El usuario fue creado el ${formattedDate}`;
}
