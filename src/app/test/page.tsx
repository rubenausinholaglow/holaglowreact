'use client';

import { Flex } from "components/Layouts/Layouts";

const scrollToElement = (
  elementId: string,
  threshold = 100,
): void => {
  const element = document.getElementById(elementId);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - threshold,
      left: 0,
      behavior: 'smooth',
    });
  }
}


export default function Test() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <Flex layout="row-center" className="gap-2">
        <button className="bg-black text-white p-4 rounded-lg" onClick={() => scrollToElement('box3', 0)}>ScrollTo box3</button>
        <button className="bg-black text-white p-4 rounded-lg" onClick={() => scrollToElement('box5', 0)}>ScrollTo box5</button>
        <button className="bg-black text-white p-4 rounded-lg" onClick={() => scrollToElement('box7', 0)}>ScrollTo box7</button>
      </Flex>

      <div id="box1" className="h-[300px] border p-16 m-16">BOX1</div>
      <div id="box2" className="h-[300px] border p-16">BOX2</div>
      <div id="box3" className="h-[300px] border p-16 m-16">BOX3</div>
      <div id="box4" className="h-[300px] border p-16">BOX4</div>
      <div id="box5" className="h-[300px] border p-16 m-16">BOX5</div>
      <div id="box6" className="h-[300px] border p-16">BOX6</div>
      <div id="box7" className="h-[300px] border p-16 m-16">BOX7</div>
      <div id="box8" className="h-[300px] border p-16">BOX8</div>
    </main>
  );
}
