'use client';

export default function IsMobile() {
  const breakpoint = window.document.querySelector('#breakpoint');

  if (breakpoint) {
    return getComputedStyle(breakpoint, ':after').content === '"sm"';
  }

  return false;
}
