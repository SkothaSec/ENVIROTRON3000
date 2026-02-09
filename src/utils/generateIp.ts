export function getRandomIpInSubnet(subnet: string): string {
  const base = subnet.split('/')[0];
  const octets = base.split('.').map(Number);
  const hostPart = Math.floor(Math.random() * 253) + 2;
  return `${octets[0]}.${octets[1]}.${octets[2]}.${hostPart}`;
}
export function generateRandomIP(): string {
  return `10.${Math.floor(Math.random() * 256)}.${Math.floor(
    Math.random() * 256
  )}.${Math.floor(Math.random() * 256)}`;
}
