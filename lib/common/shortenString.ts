export function shortenString(str: string, numChars: number = 4): string {
  if (str.length <= numChars * 2) {
    return str; // Return the original string if it's too short to shorten
  }

  const start = str.slice(0, numChars);
  const end = str.slice(-numChars);

  return `${start}...${end}`;
}