"use client";

import { useRef, useEffect } from "react";
import { MapPinHouse } from "lucide-react";

export const BrandIcon = () => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const freqPos = 0.5;
    const ampPos = 10;
    const freqRot = 0.3;
    const ampRot = 5;

    const wiggle = (time: number) => {
      const x = ampPos * Math.sin(time * freqPos * 2 * Math.PI);
      const y = ampPos * Math.cos(time * freqPos * 2 * Math.PI);

      const rotation = ampRot * Math.sin(time * freqRot * Math.PI);

      return { x, y, rotation };
    };

    const update = () => {
      const time = new Date().getTime() / 1000;
      const position = wiggle(time);

      if (elementRef.current) {
        elementRef.current.style.transform = `translate(${position.x}px, ${position.y}px) rotate(${position.rotation}deg)`;
      }

      animationFrameRef.current = requestAnimationFrame(update);
    };

    update();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="h-32 w-32 sm:h-56 sm:w-56 lg:h-96 lg:w-96" ref={elementRef}>
      <MapPinHouse className="h-full w-full" />
    </div>
  );
};
