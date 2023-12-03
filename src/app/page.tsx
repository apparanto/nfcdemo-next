import getIpData from '@/lib/ipapi/getIpData';
import { headers } from 'next/headers';
import dynamic from 'next/dynamic';

const AxMap = dynamic(
  () => import('./components/AxMap').then((mod) => mod.default),
  { ssr: false }
);

export default async function Home() {
  const realIp = headers().get('X-Real-IP') || process.env.NEXT_PUBLIC_IP_ADDRESS;
  console.log('realIp', realIp);
  const ipData: IpData | null = realIp ? await getIpData(realIp as string) : null;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 lg:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        Application demo with NextJS 14.x.
        <div>
          <a href="#" className="hover:underline">Soon</a>...
        </div>
      </div>
      {
        ipData ? (
          <AxMap lat={ipData ? ipData.latitude : 0} long={ipData ? ipData.longitude : 0} />
        ) : <></>
      }
      <div>
        <span className="text-xs">I see you {ipData ? `in ${ipData.cityName}, ${ipData.countryName} ` : ''}</span>
      </div>
    </main>
  );

}
