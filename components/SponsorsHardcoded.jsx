'use client';
// Replace with your real sponsors strip (logos/copy). No uploader—hardcoded.
export default function SponsorsHardcoded() {
  return (
    <div className="w-full p-4">
      <ul className="flex justify-center gap-10 [&_img]:h-20 [&_img]:w-auto">
        <li>
          <img src="./essington.png" alt="" />
        </li>
        <li>
          <img src="./st-doms.png" alt="" />
        </li>
      </ul>
    </div>
  );
}
