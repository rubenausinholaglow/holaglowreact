export default function ProductVideo({ src }: { src: string }) {
  return (
    <video
      controls
      muted
      loop
      playsInline
      src={src}
      className="w-full h-full block bg-black object-center rounded-xl"
    />
  );
}
