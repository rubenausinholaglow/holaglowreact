import { useRef, useState } from 'react';
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
  const dragThreshold = 20;

  const handleMouseDown = event => {
    setIsDragging(false);
    startXRef.current = event.clientX;
    isMouseDownRef.current = true;
  };

  const handleMouseMove = event => {
    setTimeout(() => {
      if (isMouseDownRef.current && !isDragging) {
        if (Math.abs(event.clientX - startXRef.current) > dragThreshold) {
          setIsDragging(true);
        }
      }
    }, 50);
  };

  const handleMouseUp = index => {
    setTimeout(() => {
      if (!isDragging) {
        setVisibleImg(index);
      }
    }, 50);
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
      <p>isDragging: {isDragging.toString()}</p>
      <p>isMouseDown: {isMouseDown.toString()}</p>
      <Carousel visibleSlides={5.5} step={1} className="border-t border-white">
        {images.map((image, index) => (
          <li
            className="shrink-0 relative aspect-square border-2 border-white"
            key={image}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={() => handleMouseUp(index)}
            onMouseLeave={() => (isMouseDownRef.current = false)}
          >
            <Image src={image} alt="image" fill className="object-cover" />
          </li>
        ))}
      </Carousel>
    </Flex>
  );
}
