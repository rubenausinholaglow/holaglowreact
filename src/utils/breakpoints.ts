'use client';

export default function IsMobile() {
  const breakpoints = window.document.querySelector('#breakpoints');

  return getComputedStyle(breakpoints, ':after').content === '"sm"';
}
