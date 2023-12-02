
export function validateIpAddress(ipAddress: string): boolean {
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipAddress)) {
    return true;
  }
  return false;
}

export default async function getIpData(ipAddress: string): Promise<IpData> {
  if (!validateIpAddress(ipAddress)) {
    throw new Error('Invalid IP address: ' + ipAddress);
  }
  const url: string = 'https://freeipapi.com/api/json/' + ipAddress;
  const res = await fetch(url);
  return res.json();
}