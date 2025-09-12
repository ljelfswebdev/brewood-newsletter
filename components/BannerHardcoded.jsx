'use client';
// Replace with your real banner contents
export default function BannerHardcoded() {
  return (
    <div className="w-full py-16 relative text-center flex flex-col items-center justify-center rounded-lg overflow-hidden">
      <div className="z-[1] absolute top-0 left-0 h-full w-full bg-[#0A006880]"></div>
      <img src="./banner.jpg" alt="Banner" className="absolute top-0 left-0 h-full w-full object-cover object-top"/>
      <h1 className="relative z-[2] text-4xl font-bold tracking-wide text-center text-white">Brewood Cricket Club</h1>
      <p className="relative z-[2] text-white text-sm text-center ">Sept 2025</p>
    </div>
  );
}
