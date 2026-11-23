'use client';

import dynamic from 'next/dynamic';

const SpatialCanvas = dynamic(() => import('./SpatialCanvas'), {
  ssr: false,
});

export default function SpatialCanvasHost() {
  return <SpatialCanvas />;
}
