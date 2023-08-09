'use client';

export function IsMobile() {
  const breakpoint = window.document.querySelector('#breakpoint');
  if (breakpoint) {
    return getComputedStyle(breakpoint, ':after').content === '"sm"';
  }

  return false;
}

export function Breakpoint() {
  return (
    <div
      id="breakpoint"
      className="after:content-['sm'] md:after:content-['md'] hidden"
    />
  );
}
