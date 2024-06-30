import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';

export default function LottieAnimation({
  animation,
  className = '',
}: {
  animation: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationData, setAnimationData] = useState(null);

  console.log(animation);

  useEffect(() => {
    const fetchAnimationData = async () => {
      try {
        const response = await fetch(animation);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error('Error fetching animation data:', error);
      }
    };

    fetchAnimationData();
  }, [animation]);

  useEffect(() => {
    if (animationData && containerRef.current) {
      const animationInstance = lottie.loadAnimation({
        container: containerRef.current,
        animationData: animationData,
        renderer: 'svg',
        loop: true,
        autoplay: true,
      });

      return () => {
        animationInstance.destroy();
      };
    }
  }, [animationData]);

  return <div ref={containerRef} className={className} />;
}
