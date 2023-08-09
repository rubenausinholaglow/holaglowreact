'use client';

export default function IsMobile() {
  const breakpoint = window.document.querySelector('#breakpoint');

  console.log(getComputedStyle(breakpoint, ':after').content);

  if (breakpoint) {
    return getComputedStyle(breakpoint, ':after').content === '"sm"';
  }

  return false;
}
