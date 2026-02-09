export function generateHostName(
  fullName: string,
  index: number,
  isAlt: boolean = false
): string {
  const base = fullName
    .toLowerCase()
    .replace(/[^a-z]/g, '') // remove spaces/special chars
    .slice(0, 8); // limit to 8 chars
  const suffix = isAlt ? `-alt${index}` : `-${index}`;
  return `ws-${base}${suffix}`;
}
