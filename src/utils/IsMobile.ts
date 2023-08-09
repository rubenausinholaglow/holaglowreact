export default function IsMobile() {
  const breakpoints = window.document.querySelector('#breakpoints');

  if (breakpoints) {
    return getComputedStyle(breakpoints, ':after').content === '"sm"';
  }

  return false;
}
