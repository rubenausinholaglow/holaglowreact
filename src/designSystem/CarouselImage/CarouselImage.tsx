import { useEffect, useRef, useState } from 'react';
import Carousel from 'designSystem/Carousel/Carousel';
import { Flex } from 'designSystem/Layouts/Layouts';
import Image from 'next/image';

export default function CarouselImage({
  images,
  format,
}: {
  images: string[];
  format: string;
}) {
  const [visibleImg, setVisibleImg] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const startXRef = useRef(0);
  const isMouseDownRef = useRef(false);
  const dragThreshold = 5;

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isMouseDownRef.current) {
        isMouseDownRef.current = false;
        setIsMouseDown(false);
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  const handleMouseDown = event => {
    setIsDragging(false);
    startXRef.current = event.clientX;
    isMouseDownRef.current = true;
    setIsMouseDown(true);
  };

  const handleMouseMove = event => {
    if (isMouseDownRef.current && !isDragging) {
      if (Math.abs(event.clientX - startXRef.current) > dragThreshold) {
        setIsDragging(true);
      }
    }
  };

  const handleMouseUp = index => {
    if (!isDragging) {
      setVisibleImg(index);
    }
    isMouseDownRef.current = false;
    setIsMouseDown(false);
  };

  return (
    <Flex layout="col-left" className="w-full">
      <div className={`relative w-full ${format}`}>
        <Image
          src={images[visibleImg]}
          alt="image"
          fill
          className="object-cover"
        />
      </div>
      <Carousel visibleSlides={5.5} step={1} className="border-t border-white">
        {images.map((image, index) => (
          <li
            className="shrink-0 relative aspect-square border-2 border-white"
            key={image}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={() => handleMouseUp(index)}
            onMouseLeave={() => {
              isMouseDownRef.current = false;
              setIsMouseDown(false);
            }}
          >
            <Image src={image} alt="image" fill className="object-cover" />
          </li>
        ))}
      </Carousel>
    </Flex>
  );
}
