import { headers } from 'next/headers';
import dynamic from 'next/dynamic';
import getVisitor from '@/lib/visitor/getVisitor';
import { IVisitor } from '@/models/visitor/Visitor';

const AxMap = dynamic(
  () => import('./components/AxMap').then((mod) => mod.default),
  { ssr: false }
);

export default async function Home() {
  const realIp = headers().get('X-Real-IP') || process.env.NEXT_PUBLIC_IP_ADDRESS;
  console.log('realIp', realIp);
  const v: IVisitor | null = realIp ? await getVisitor(realIp as string) : null;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 lg:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        Application demo with NextJS 14.x.
        <div>
          <a href="#" className="hover:underline">Soon</a>...
        </div>
      </div>
      {
        v ? (
          <AxMap v={v} />
        ) : <></>
      }
      <div>
        <span className="text-xs">I see you {v ? `in ${v.cityName}, ${v.countryName} ` : ''}</span>
      </div>
    </main>
  );

}
