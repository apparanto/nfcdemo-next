import { headers } from 'next/headers';


export default function Home() {
  const realIp = headers().get('X-Real-IP');
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        NFC demo with NextJS 14.x.
        <div>
          <a href="#" className="hover:underline">Soon</a>...
        </div>
      </div>
      <div>
        <span className="text-xs">I see you {realIp}</span>
      </div>
    </main>
  );
}
