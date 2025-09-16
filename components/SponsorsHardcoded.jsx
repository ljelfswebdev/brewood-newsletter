'use client';
// Replace with your real sponsors strip (logos/copy). No uploader—hardcoded.
export default function SponsorsHardcoded() {
  return (
    <div className="w-full pt-4 mt-auto">
      <ul className="flex justify-center items-center gap-10 [&_img]:h-auto [&_img]:w-20">
        <li>
          <img src="./essington.png" alt="" />
        </li>
        <li>
          <img src="./st-doms.png" alt=""/>
        </li>
      </ul>
    </div>
  );
}
